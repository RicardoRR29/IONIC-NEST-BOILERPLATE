import { Inject, Injectable } from '@nestjs/common';
import { JwtTokenService } from './jwt.service';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { ICryptoService } from '../../domain/services/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository') private readonly usersRepo: IUserRepository,
    @Inject('ICryptoService') private readonly crypto: ICryptoService,
    private readonly jwt: JwtTokenService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersRepo.findByEmail(email);
    if (user && (await this.crypto.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
