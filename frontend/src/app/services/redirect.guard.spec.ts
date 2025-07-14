import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { redirectGuard } from './redirect.guard';
import { AuthService } from './auth.service';

describe('redirectGuard', () => {
  it('should redirect to login when not logged in', () => {
    const router = { navigateByUrl: jasmine.createSpy('navigateByUrl') } as any as Router;
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isLoggedIn: () => false } },
        { provide: Router, useValue: router },
      ],
    });

    const result = TestBed.runInInjectionContext(() => redirectGuard({} as any, {} as any));
    expect(result).toBeFalse();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should redirect to users when logged in', () => {
    const router = { navigateByUrl: jasmine.createSpy('navigateByUrl') } as any as Router;
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isLoggedIn: () => true } },
        { provide: Router, useValue: router },
      ],
    });

    const result = TestBed.runInInjectionContext(() => redirectGuard({} as any, {} as any));
    expect(result).toBeFalse();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/users');
  });
});
