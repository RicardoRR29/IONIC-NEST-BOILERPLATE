import { ListUsersUseCase } from './list-users.use-case';
import { IUserRepository } from '../../../domain/repositories/user.repository';

describe('ListUsersUseCase', () => {
  it('returns all users', async () => {
    const repo = { findAll: jest.fn().mockResolvedValue([{ id: 1 }]) } as any as IUserRepository;
    const useCase = new ListUsersUseCase(repo);
    const res = await useCase.execute();
    expect(res).toHaveLength(1);
  });
});
