import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import { AuthModule } from '../src/infrastructure/modules/auth.module';
import { UsersModule } from '../src/infrastructure/modules/users.module';
import { User } from '../src/domain/entities/user.entity';

describe('Users API (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let userId: number;

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

    const regRes = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'Dave', email: 'dave@example.com', password: 'Pass@123' });
    userId = regRes.body.id;

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'dave@example.com', password: 'Pass@123' });
    token = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('lists users', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('fetches a user by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body).toEqual(expect.objectContaining({ id: userId }));
  });

  it('updates a user', async () => {
    const res = await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated' })
      .expect(200);
    expect(res.body).toEqual(
      expect.objectContaining({ id: userId, name: 'Updated' }),
    );
  });

  it('removes a user', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const res = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body).toBeNull();
  });
});
