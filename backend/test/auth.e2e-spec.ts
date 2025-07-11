import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import { Server } from 'http';
import { AuthModule } from '../src/infrastructure/modules/auth.module';
import { UsersModule } from '../src/infrastructure/modules/users.module';
import { User } from '../src/domain/entities/user.entity';

interface RegisterResponse {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  access_token: string;
}

interface ProfileResponse {
  userId: number;
  email: string;
}

describe('Auth API (e2e)', () => {
  let app: INestApplication;
  let httpServer: Server;

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
    httpServer = app.getHttpServer() as Server;
  });

  afterAll(async () => {
    await app.close();
  });

  it('registers a user', async () => {
    const response = await request(httpServer)
      .post('/auth/register')
      .send({ name: 'Alice', email: 'alice@example.com', password: 'Pass@123' })
      .expect(201);

    const body = response.body as unknown as RegisterResponse;

    expect(typeof body.id).toBe('number');
    expect(body.name).toBe('Alice');
    expect(body.email).toBe('alice@example.com');
  });

  it('logs in and returns a token', async () => {
    await request(httpServer)
      .post('/auth/register')
      .send({ name: 'Bob', email: 'bob@example.com', password: 'Pass@123' });

    const response = await request(httpServer)
      .post('/auth/login')
      .send({ email: 'bob@example.com', password: 'Pass@123' })
      .expect(201);

    const body = response.body as unknown as LoginResponse;
    expect(typeof body.access_token).toBe('string');
  });

  it('returns profile data for a valid token', async () => {
    await request(httpServer).post('/auth/register').send({
      name: 'Carol',
      email: 'carol@example.com',
      password: 'Pass@123',
    });

    const loginResponse = await request(httpServer)
      .post('/auth/login')
      .send({ email: 'carol@example.com', password: 'Pass@123' })
      .expect(201);

    const loginBody = loginResponse.body as unknown as LoginResponse;
    const token: string = loginBody.access_token;

    const profileResponse = await request(httpServer)
      .post('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    const profile = profileResponse.body as unknown as ProfileResponse;

    expect(typeof profile.userId).toBe('number');
    expect(profile.email).toBe('carol@example.com');
  });
});
