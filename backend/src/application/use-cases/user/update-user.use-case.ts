import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../../domain/entities/user.entity';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly usersRepo: IUserRepository,
  ) {}

  async execute(id: number, dto: UpdateUserDto): Promise<User> {
    try {
      return await this.usersRepo.update(id, dto);
    } catch (err) {
      throw new AppException(
        ErrorCodes.USER.UPDATE_FAILED.code,
        ErrorCodes.USER.UPDATE_FAILED.message,
        400,
      );
    }
  }
}
