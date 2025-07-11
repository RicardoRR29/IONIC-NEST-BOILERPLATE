import { ListUsersUseCase } from './list-users.use-case';
import { IUserRepository } from '../../../domain/repositories/user.repository';

describe('ListUsersUseCase', () => {
  it('returns all users', async () => {
    const repo: jest.Mocked<IUserRepository> = {
      create: jest.fn(),
      findAll: jest.fn().mockResolvedValue([{ id: 1 } as any]),
      findOne: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const useCase = new ListUsersUseCase(repo);
    const res = await useCase.execute();
    expect(res).toHaveLength(1);
  });
});
