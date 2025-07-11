import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UserOrmRepository } from './user.orm.repository';

describe('UserOrmRepository', () => {
  let repo: UserOrmRepository;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserOrmRepository],
    }).compile();

    repo = module.get(UserOrmRepository);
  });

  afterAll(async () => {
    await module.close();
  });

  it('creates and finds a user', async () => {
    const user = await repo.create({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'pass',
    });

    const found = await repo.findOne(user.id);
    expect(found?.email).toBe('alice@example.com');
  });

  it('updates and removes a user', async () => {
    const user = await repo.create({
      name: 'Bob',
      email: 'bob@example.com',
      password: 'pass',
    });

    const updated = await repo.update(user.id, { name: 'Bobby' });
    expect(updated.name).toBe('Bobby');

    await repo.remove(user.id);
    const after = await repo.findOne(user.id);
    expect(after).toBeNull();
  });
});
