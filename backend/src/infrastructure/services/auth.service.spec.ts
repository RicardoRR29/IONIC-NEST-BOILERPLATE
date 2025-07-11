import { AuthService } from './auth.service';
import { JwtTokenService } from './jwt.service';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { ICryptoService } from '../../domain/services/crypto.service';

describe('AuthService', () => {
  let service: AuthService;
  let repo: jest.Mocked<IUserRepository>;
  let crypto: jest.Mocked<ICryptoService>;
  let jwt: jest.Mocked<JwtTokenService>;

  const user = { id: 1, email: 'a@test.com', password: 'hashed', name: 'Alice' } as any;

  beforeEach(() => {
    repo = {
      findByEmail: jest.fn().mockResolvedValue(user),
    } as any;
    crypto = {
      compare: jest.fn().mockResolvedValue(true),
    } as any;
    jwt = { sign: jest.fn().mockReturnValue('token') } as any;
    service = new AuthService(repo, crypto, jwt);
  });

  it('validates user credentials', async () => {
    const res = await service.validateUser('a@test.com', 'secret');
    expect(res).toEqual({ id: 1, email: 'a@test.com', name: 'Alice' });
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
