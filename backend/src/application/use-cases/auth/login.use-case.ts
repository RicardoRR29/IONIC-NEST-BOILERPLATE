import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { ICryptoService } from '../../../domain/services/crypto.service';
import { LoginDto } from '../../dto/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository') private readonly usersRepo: IUserRepository,
    @Inject('ICryptoService') private readonly crypto: ICryptoService,
    private readonly jwt: JwtService,
  ) {}

  async execute(dto: LoginDto): Promise<{ access_token: string } | null> {
    const user = await this.usersRepo.findByEmail(dto.email);
    if (!user) return null;
    const valid = await this.crypto.compare(dto.password, user.password);
    if (!valid) return null;
    const payload = { username: user.email, sub: user.id };
    return { access_token: this.jwt.sign(payload) };
  }
}
