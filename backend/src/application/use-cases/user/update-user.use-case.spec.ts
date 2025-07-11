import { UpdateUserUseCase } from './update-user.use-case';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { AppException } from '../../../shared/exceptions/app.exception';
import { UpdateUserDto } from '../../dto/update-user.dto';

const dto: UpdateUserDto = { name: 'New' };

describe('UpdateUserUseCase', () => {
  let repo: jest.Mocked<IUserRepository>;
  let useCase: UpdateUserUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as jest.Mocked<IUserRepository>;
    useCase = new UpdateUserUseCase(repo);
  });

  it('updates a user', async () => {
    repo.update.mockResolvedValue({
      id: 1,
      name: 'New',
      email: 'test@example.com',
      password: 'secret',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const res = await useCase.execute(1, dto);
    expect(res.id).toBe(1);
    expect(res.name).toBe('New');
  });

  it('throws on error', async () => {
    repo.update.mockRejectedValue(new Error('fail'));
    await expect(useCase.execute(1, dto)).rejects.toBeInstanceOf(AppException);
  });
});
