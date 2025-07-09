import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(@Inject('IUserRepository') private readonly usersRepo: IUserRepository) {}

  execute(id: number): Promise<User | null> {
    return this.usersRepo.findOne(id);
  }
}
