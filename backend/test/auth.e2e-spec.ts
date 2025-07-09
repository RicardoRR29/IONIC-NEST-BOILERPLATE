import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import { AuthModule } from '../src/infrastructure/modules/auth.module';
import { UsersModule } from '../src/infrastructure/modules/users.module';
import { User } from '../src/domain/entities/user.entity';

describe('Auth API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'testsecret';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
        UsersModule,
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('registers a user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'Alice', email: 'alice@example.com', password: 'Pass@123' })
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'Alice',
        email: 'alice@example.com',
      }),
    );
    expect(res.body.password).toBeUndefined();
  });

  it('logs in and returns a token', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'Bob', email: 'bob@example.com', password: 'Pass@123' });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'bob@example.com', password: 'Pass@123' })
      .expect(201);

    expect(loginRes.body.access_token).toBeDefined();
  });

  it('returns profile data for a valid token', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Carol',
        email: 'carol@example.com',
        password: 'Pass@123',
      });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'carol@example.com', password: 'Pass@123' });
    const token = loginRes.body.access_token;

    const profileRes = await request(app.getHttpServer())
      .post('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    expect(profileRes.body).toEqual({
      userId: expect.any(Number),
      email: 'carol@example.com',
    });
  });
});
