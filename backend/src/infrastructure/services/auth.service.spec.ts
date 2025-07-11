import { AuthService } from './auth.service';
import { JwtTokenService } from './jwt.service';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { ICryptoService } from '../../domain/services/crypto.service';
import { User } from '../../domain/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let repo: jest.Mocked<IUserRepository>;
  let crypto: jest.Mocked<ICryptoService>;
  let jwt: JwtTokenService;

  const user: User = {
    id: 1,
    email: 'a@test.com',
    password: 'hashed',
    name: 'Alice',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByEmail: jest.fn().mockResolvedValue(user),
      update: jest.fn(),
      remove: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    crypto = {
      hash: jest.fn(),
      compare: jest.fn().mockResolvedValue(true),
    } as jest.Mocked<ICryptoService>;

    jwt = {
      sign: jest.fn().mockReturnValue('token'),
      verify: jest.fn(),
    } as unknown as JwtTokenService;
    service = new AuthService(repo, crypto, jwt);
  });

  it('validates user credentials', async () => {
    const res = await service.validateUser('a@test.com', 'secret');
    expect(res).toEqual(
      expect.objectContaining({ id: 1, email: 'a@test.com', name: 'Alice' }),
    );
  });

  it('returns null for invalid credentials', async () => {
    crypto.compare.mockResolvedValue(false);
    const res = await service.validateUser('a@test.com', 'bad');
    expect(res).toBeNull();
  });

  it('returns a token on login', async () => {
    const res = await service.login(user);
    expect(res).toEqual({ access_token: 'token' });
  });
});
