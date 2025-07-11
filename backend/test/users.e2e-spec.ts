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
}

interface LoginResponse {
  access_token: string;
}

describe('Users API (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let userId: number;
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
    httpServer = app.getHttpServer();

    const regRes = await request(httpServer)
      .post('/auth/register')
      .send({ name: 'Dave', email: 'dave@example.com', password: 'Pass@123' });
    const regBody = regRes.body as unknown as RegisterResponse;
    userId = regBody.id;

    const loginRes = await request(httpServer)
      .post('/auth/login')
      .send({ email: 'dave@example.com', password: 'Pass@123' });
    const loginBody = loginRes.body as unknown as LoginResponse;
    token = loginBody.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('lists users', async () => {
    const res = await request(httpServer)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const list = res.body as unknown[];
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
  });

  it('fetches a user by id', async () => {
    const res = await request(httpServer)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const body = res.body as { id: number };
    expect(body).toEqual(expect.objectContaining({ id: userId }));
  });

  it('updates a user', async () => {
    const res = await request(httpServer)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated' })
      .expect(200);
    const body = res.body as { id: number; name: string };
    expect(body).toEqual(
      expect.objectContaining({ id: userId, name: 'Updated' }),
    );
  });

  it('removes a user', async () => {
    await request(httpServer)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await request(httpServer)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401);
  });
});
