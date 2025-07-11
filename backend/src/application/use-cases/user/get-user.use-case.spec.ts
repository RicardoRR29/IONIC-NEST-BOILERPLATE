import { GetUserUseCase } from './get-user.use-case';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { AppException } from '../../../shared/exceptions/app.exception';

const user = { id: 1 } as any;

describe('GetUserUseCase', () => {
  let repo: jest.Mocked<IUserRepository>;
  let useCase: GetUserUseCase;

  beforeEach(() => {
    repo = { findOne: jest.fn() } as any;
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
