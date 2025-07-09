import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly usersRepo: IUserRepository,
  ) {}

  async execute(id: number, dto: UpdateUserDto): Promise<User> {
    return this.usersRepo.update(id, dto);
  }
}
