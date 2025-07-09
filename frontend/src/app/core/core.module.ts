import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../users/services/user.service';
import { UiService } from './services/ui.service';
import { authInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthService,
    UserService,
    UiService,
    { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true },
  ],
})
export class CoreModule {}
