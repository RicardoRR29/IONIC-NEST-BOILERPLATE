import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../shared/toast.service';
import { ErrorTranslatorService } from '../services/error-translator.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const translator = inject(ErrorTranslatorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const userMsg = error?.error?.userMessage;
      const code = error?.error?.internalCode;
      const message = userMsg || translator.translate(code);
      toast.error(message);
      return throwError(() => error);
    })
  );
};
