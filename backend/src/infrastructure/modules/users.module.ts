import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserOrmRepository } from '../database/postgres/user.orm.repository';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case';
import { ListUsersUseCase } from '../../application/use-cases/user/list-users.use-case';
import { GetUserUseCase } from '../../application/use-cases/user/get-user.use-case';
import { BcryptService } from '../services/bcrypt.service';
import { UsersController } from '../../interface/http/controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UserOrmRepository,
    BcryptService,
    { provide: 'IUserRepository', useExisting: UserOrmRepository },
    { provide: 'ICryptoService', useExisting: BcryptService },
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ListUsersUseCase,
    GetUserUseCase,
  ],
  exports: [
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ListUsersUseCase,
    GetUserUseCase,
    'IUserRepository',
    'ICryptoService',
  ],
})
export class UsersModule {}
