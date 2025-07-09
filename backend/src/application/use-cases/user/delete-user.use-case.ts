import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(@Inject('IUserRepository') private readonly usersRepo: IUserRepository) {}

  execute(id: number): Promise<void> {
    return this.usersRepo.remove(id);
  }
}
