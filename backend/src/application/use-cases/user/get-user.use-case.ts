import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly usersRepo: IUserRepository,
  ) {}

  async execute(id: number): Promise<User> {
    const user = await this.usersRepo.findOne(id);
    if (!user) {
      throw new AppException(
        ErrorCodes.USER.USER_NOT_FOUND.code,
        ErrorCodes.USER.USER_NOT_FOUND.message,
        404,
      );
    }
    return user;
  }
}
