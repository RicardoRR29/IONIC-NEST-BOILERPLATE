// src/app/core/interceptors/http-error.interceptor.ts
import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn, // ✅ importe o tipo correto
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../shared/toast.service';
import { ErrorTranslatorService } from '../services/error-translator.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const translator = inject(ErrorTranslatorService);
      const toast = inject(ToastService);
      const userMsg = error?.error?.userMessage;
      const code = error?.error?.internalCode;
      const message = userMsg || translator.translate(code);
      toast.error(message);
      return throwError(() => error);
    })
  );
};
