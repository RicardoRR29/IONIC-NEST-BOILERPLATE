import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users.module';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../../interface/http/controllers/auth.controller';
import { LocalStrategy } from '../../interface/http/guards/local.strategy';
import { JwtStrategy } from '../../interface/http/guards/jwt.strategy';
import { JwtTokenService } from '../services/jwt.service';
import { BcryptService } from '../services/bcrypt.service';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtTokenService,
    BcryptService,
    { provide: 'ICryptoService', useExisting: BcryptService },
    LoginUseCase,
  ],
})
export class AuthModule {}
