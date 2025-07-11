import { Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';
import { ITokenBlacklistService } from '../../../domain/services/token-blacklist.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject('ITokenBlacklistService')
    private readonly blacklist: ITokenBlacklistService,
  ) {
    super();
  }

  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    const req = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (token && this.blacklist.has(token)) {
      throw new AppException(
        ErrorCodes.AUTH.TOKEN_INVALID.code,
        ErrorCodes.AUTH.TOKEN_INVALID.message,
        401,
      );
    }

    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new AppException(
          ErrorCodes.AUTH.TOKEN_EXPIRED.code,
          ErrorCodes.AUTH.TOKEN_EXPIRED.message,
          401,
        );
      }
      if (info?.message === 'No auth token') {
        throw new AppException(
          ErrorCodes.AUTH.MISSING_TOKEN.code,
          ErrorCodes.AUTH.MISSING_TOKEN.message,
          401,
        );
      }
      throw new AppException(
        ErrorCodes.AUTH.TOKEN_INVALID.code,
        ErrorCodes.AUTH.TOKEN_INVALID.message,
        401,
      );
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
