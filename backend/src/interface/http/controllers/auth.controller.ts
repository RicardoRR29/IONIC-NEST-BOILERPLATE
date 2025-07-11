import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { CreateUserUseCase } from '../../../application/use-cases/user/create-user.use-case';
import { CreateUserDto } from '../../../application/dto/create-user.dto';
import { LoginUseCase } from '../../../application/use-cases/auth/login.use-case';
import { LoginDto } from '../../../application/dto/login.dto';
import { LogoutUseCase } from '../../../application/use-cases/auth/logout.use-case';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private createUser: CreateUserUseCase,
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase,
  ) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  async register(@Body() dto: CreateUserDto) {
    const user = await this.createUser.execute(dto);
    const { password, ...result } = user;
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req, @Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  logout(@Request() req) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (token) {
      this.logoutUseCase.execute(token);
    }
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
