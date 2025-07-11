import { DeleteUserUseCase } from './delete-user.use-case';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { AppException } from '../../../shared/exceptions/app.exception';

describe('DeleteUserUseCase', () => {
  let repo: jest.Mocked<IUserRepository>;
  let useCase: DeleteUserUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    useCase = new DeleteUserUseCase(repo);
  });

  it('removes a user', async () => {
    repo.remove.mockResolvedValue(undefined);
    await expect(useCase.execute(1)).resolves.toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(repo.remove).toHaveBeenCalledWith(1);
  });

  it('throws on error', async () => {
    repo.remove.mockRejectedValue(new Error('fail'));
    await expect(useCase.execute(1)).rejects.toBeInstanceOf(AppException);
  });
});
