import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const redirectGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const target = auth.isLoggedIn() ? '/users' : '/login';
  router.navigateByUrl(target);
  return false;
};
