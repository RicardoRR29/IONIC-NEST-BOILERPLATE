import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from '../users/services/user.service';
import { UiService } from './services/ui.service';
import { authInterceptor } from './interceptors/auth.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthService,
    UserService,
    UiService,
    { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
})
export class CoreModule {}
