import { LogoutUseCase } from './logout.use-case';
import { ITokenBlacklistService } from '../../../domain/services/token-blacklist.service';
import { JwtService } from '@nestjs/jwt';

describe('LogoutUseCase', () => {
  it('adds token to blacklist', () => {
    const blacklist: jest.Mocked<ITokenBlacklistService> = {
      add: jest.fn(),
      has: jest.fn(),
    };
    const useCase = new LogoutUseCase(
      blacklist,
      new JwtService({ secret: 't' }),
    );
    useCase.execute('token');
    expect(blacklist.add).toHaveBeenCalled();
  });
});
