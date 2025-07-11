import { UpdateUserUseCase } from './update-user.use-case';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { AppException } from '../../../shared/exceptions/app.exception';

const dto = { name: 'New' };

describe('UpdateUserUseCase', () => {
  let repo: jest.Mocked<IUserRepository>;
  let useCase: UpdateUserUseCase;

  beforeEach(() => {
    repo = { update: jest.fn() } as any;
    useCase = new UpdateUserUseCase(repo);
  });

  it('updates a user', async () => {
    repo.update.mockResolvedValue({ id: 1, name: 'New' } as any);
    const res = await useCase.execute(1, dto as any);
    expect(res).toEqual({ id: 1, name: 'New' });
  });

  it('throws on error', async () => {
    repo.update.mockRejectedValue(new Error('fail'));
    await expect(useCase.execute(1, dto as any)).rejects.toBeInstanceOf(AppException);
  });
});
