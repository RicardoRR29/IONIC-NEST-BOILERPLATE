import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { ICryptoService } from '../../../domain/services/crypto.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../../domain/entities/user.entity';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly usersRepo: IUserRepository,
    @Inject('ICryptoService') private readonly crypto: ICryptoService,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const exists = await this.usersRepo.findByEmail(dto.email);
    if (exists) {
      throw new AppException(
        ErrorCodes.USER.EMAIL_ALREADY_EXISTS.code,
        ErrorCodes.USER.EMAIL_ALREADY_EXISTS.message,
      );
    }

    const password = await this.crypto.hash(dto.password);
    return this.usersRepo.create({ ...dto, password });
  }
}
