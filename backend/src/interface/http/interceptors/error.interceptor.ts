import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof AppException) return throwError(() => error);

        return throwError(
          () =>
            new AppException(
              ErrorCodes.GENERAL.UNKNOWN_ERROR.code,
              ErrorCodes.GENERAL.UNKNOWN_ERROR.message,
              500,
            ),
        );
      }),
    );
  }
}
