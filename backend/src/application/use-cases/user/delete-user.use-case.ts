import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly usersRepo: IUserRepository,
  ) {}

  async execute(id: number): Promise<void> {
    try {
      await this.usersRepo.remove(id);
    } catch (err) {
      throw new AppException(
        ErrorCodes.USER.DELETION_FAILED.code,
        ErrorCodes.USER.DELETION_FAILED.message,
        400,
      );
    }
  }
}
