import { DeleteUserUseCase } from './delete-user.use-case';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { AppException } from '../../../shared/exceptions/app.exception';

describe('DeleteUserUseCase', () => {
  let repo: jest.Mocked<IUserRepository>;
  let useCase: DeleteUserUseCase;

  beforeEach(() => {
    repo = { remove: jest.fn() } as any;
    useCase = new DeleteUserUseCase(repo);
  });

  it('removes a user', async () => {
    repo.remove.mockResolvedValue(undefined);
    await expect(useCase.execute(1)).resolves.toBeUndefined();
    expect(repo.remove).toHaveBeenCalledWith(1);
  });

  it('throws on error', async () => {
    repo.remove.mockRejectedValue(new Error('fail'));
    await expect(useCase.execute(1)).rejects.toBeInstanceOf(AppException);
  });
});
