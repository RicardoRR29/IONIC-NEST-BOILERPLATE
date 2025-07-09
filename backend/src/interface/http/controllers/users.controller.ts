import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../../application/dto/update-user.dto';
import { CreateUserUseCase } from '../../../application/use-cases/user/create-user.use-case';
import { UpdateUserUseCase } from '../../../application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../../../application/use-cases/user/delete-user.use-case';
import { ListUsersUseCase } from '../../../application/use-cases/user/list-users.use-case';
import { GetUserUseCase } from '../../../application/use-cases/user/get-user.use-case';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly listUsers: ListUsersUseCase,
    private readonly getUser: GetUserUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.listUsers.execute();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUser.execute(+id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.updateUser.execute(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUser.execute(+id);
  }
}
