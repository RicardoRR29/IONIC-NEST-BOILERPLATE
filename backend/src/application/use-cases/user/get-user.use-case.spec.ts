import { GetUserUseCase } from './get-user.use-case';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { AppException } from '../../../shared/exceptions/app.exception';

import { User } from '../../../domain/entities/user.entity';

const user: User = {
  id: 1,
  name: 'Test',
  email: 'test@example.com',
  password: 'secret',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('GetUserUseCase', () => {
  let repo: jest.Mocked<IUserRepository>;
  let useCase: GetUserUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as jest.Mocked<IUserRepository>;
    useCase = new GetUserUseCase(repo);
  });

  it('returns a user', async () => {
    repo.findOne.mockResolvedValue(user);
    const res = await useCase.execute(1);
    expect(res).toBe(user);
  });

  it('throws when user missing', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(useCase.execute(1)).rejects.toBeInstanceOf(AppException);
  });
});
