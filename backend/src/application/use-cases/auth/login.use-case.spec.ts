import { LoginUseCase } from './login.use-case';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { ICryptoService } from '../../../domain/services/crypto.service';
import { JwtService } from '@nestjs/jwt';
import { AppException } from '../../../shared/exceptions/app.exception';

const dto = { email: 'bob@test.com', password: 'pass' };

import { User } from '../../../domain/entities/user.entity';

const user: User = {
  id: 1,
  email: 'bob@test.com',
  password: 'hashed',
  name: 'Bob',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('LoginUseCase', () => {
  let repo: jest.Mocked<IUserRepository>;
  let crypto: jest.Mocked<ICryptoService>;
  let useCase: LoginUseCase;

  beforeEach(() => {
    repo = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    crypto = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as jest.Mocked<ICryptoService>;

    useCase = new LoginUseCase(
      repo,
      crypto,
      new JwtService({ secret: 'test' }),
    );
  });

  it('returns a token for valid credentials', async () => {
    repo.findByEmail.mockResolvedValue(user);
    crypto.compare.mockResolvedValue(true);
    const res = await useCase.execute(dto);
    expect(res.access_token).toBeDefined();
  });

  it('throws when email not found', async () => {
    repo.findByEmail.mockResolvedValue(null);
    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(AppException);
  });

  it('throws when password invalid', async () => {
    repo.findByEmail.mockResolvedValue(user);
    crypto.compare.mockResolvedValue(false);
    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(AppException);
  });
});
