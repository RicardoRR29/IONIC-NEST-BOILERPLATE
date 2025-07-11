import { CreateUserUseCase } from './create-user.use-case';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { ICryptoService } from '../../../domain/services/crypto.service';
import { AppException } from '../../../shared/exceptions/app.exception';

const dto = { name: 'Bob', email: 'bob@test.com', password: 'Secret@1' };

describe('CreateUserUseCase', () => {
  let repo: jest.Mocked<IUserRepository>;
  let crypto: jest.Mocked<ICryptoService>;
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    crypto = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as jest.Mocked<ICryptoService>;

    useCase = new CreateUserUseCase(repo, crypto);
  });

  it('creates a user when email is new', async () => {
    repo.findByEmail.mockResolvedValue(null);
    crypto.hash.mockResolvedValue('hashed');
    repo.create.mockImplementation((u) =>
      Promise.resolve({
        id: 1,
        name: u.name as string,
        email: u.email as string,
        password: u.password as string,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
    const result = await useCase.execute(dto);
    expect(result).toEqual(
      expect.objectContaining({ id: 1, password: 'hashed' }),
    );
  });

  it('throws when email exists', async () => {
    repo.findByEmail.mockResolvedValue({
      id: 1,
      name: 'Existing',
      email: 'bob@test.com',
      password: 'hashed',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(AppException);
  });
});
