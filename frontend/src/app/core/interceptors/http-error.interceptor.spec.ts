import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { ToastService } from '../../shared/toast.service';
import { ErrorTranslatorService } from '../services/error-translator.service';

class ToastMock {
  error = jasmine.createSpy('error');
}

describe('HttpErrorInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  let toast: ToastMock;

  beforeEach(() => {
    toast = new ToastMock();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ErrorTranslatorService,
        { provide: ToastService, useValue: toast },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should show translated error message', () => {
    http.get('/test').subscribe({ error: () => {} });
    const req = controller.expectOne('/test');
    req.flush({ internalCode: 'AUTH_001' }, { status: 400, statusText: 'Bad Request' });
    expect(toast.error).toHaveBeenCalledWith('E-mail ou senha incorretos.');
  });
});
