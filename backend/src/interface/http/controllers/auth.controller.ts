import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { CreateUserUseCase } from '../../../application/use-cases/user/create-user.use-case';
import { CreateUserDto } from '../../../application/dto/create-user.dto';
import { LoginUseCase } from '../../../application/use-cases/auth/login.use-case';
import { LoginDto } from '../../../application/dto/login.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private createUser: CreateUserUseCase,
    private loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.createUser.execute(dto);
    const { password, ...result } = user;
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
