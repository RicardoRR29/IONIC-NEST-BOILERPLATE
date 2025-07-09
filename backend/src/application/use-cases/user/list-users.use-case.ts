import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject('IUserRepository') private readonly usersRepo: IUserRepository,
  ) {}

  execute(): Promise<User[]> {
    return this.usersRepo.findAll();
  }
}
