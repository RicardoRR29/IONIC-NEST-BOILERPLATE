import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { redirectGuard } from './services/redirect.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/auth.page').then((m) => m.AuthPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/auth.page').then((m) => m.AuthPage),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./users/pages/users.page').then((m) => m.UsersPage),
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [redirectGuard],
  },
  {
    path: '**',
    canActivate: [redirectGuard],
  },
];
