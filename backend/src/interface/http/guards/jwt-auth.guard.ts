import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
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
