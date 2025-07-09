import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { ICryptoService } from '../../../domain/services/crypto.service';
import { LoginDto } from '../../dto/login.dto';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository') private readonly usersRepo: IUserRepository,
    @Inject('ICryptoService') private readonly crypto: ICryptoService,
    private readonly jwt: JwtService,
  ) {}

  async execute(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersRepo.findByEmail(dto.email);
    if (!user) {
      throw new AppException(
        ErrorCodes.AUTH.INVALID_CREDENTIALS.code,
        ErrorCodes.AUTH.INVALID_CREDENTIALS.message,
        401,
      );
    }
    const valid = await this.crypto.compare(dto.password, user.password);
    if (!valid) {
      throw new AppException(
        ErrorCodes.AUTH.INVALID_CREDENTIALS.code,
        ErrorCodes.AUTH.INVALID_CREDENTIALS.message,
        401,
      );
    }
    const payload = { username: user.email, sub: user.id };
    return { access_token: this.jwt.sign(payload) };
  }
}
