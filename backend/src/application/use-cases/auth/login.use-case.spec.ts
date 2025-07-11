import { LoginUseCase } from './login.use-case';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { ICryptoService } from '../../../domain/services/crypto.service';
import { JwtService } from '@nestjs/jwt';
import { AppException } from '../../../shared/exceptions/app.exception';

const dto = { email: 'bob@test.com', password: 'pass' };
const user = { id: 1, email: 'bob@test.com', password: 'hashed' } as any;

describe('LoginUseCase', () => {
  let repo: jest.Mocked<IUserRepository>;
  let crypto: jest.Mocked<ICryptoService>;
  let useCase: LoginUseCase;

  beforeEach(() => {
    repo = { findByEmail: jest.fn() } as any;
    crypto = { compare: jest.fn() } as any;
    useCase = new LoginUseCase(repo, crypto, new JwtService({ secret: 'test' }));
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
