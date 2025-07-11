import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  const base = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  it('should login and store token', async () => {
    const token = 'jwt.token';
    const promise = service.login('test@example.com', 'pass');
    const req = http.expectOne(`${base}/auth/login`);
    req.flush({ access_token: token });
    await promise;
    expect(localStorage.getItem('token')).toBe(token);
  });

  it('should register user', async () => {
    const promise = service.register('name', 'e@e.com', 'Pass@123');
    const req = http.expectOne(`${base}/auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush({});
    await promise;
  });

  it('should detect logged in status', () => {
    const exp = Math.floor(Date.now() / 1000) + 60;
    const token = `a.${btoa(JSON.stringify({ sub: 1, exp }))}.c`;
    localStorage.setItem('token', token);
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return userId and token', () => {
    const exp = Math.floor(Date.now() / 1000) + 60;
    const token = `a.${btoa(JSON.stringify({ sub: 2, exp }))}.c`;
    localStorage.setItem('token', token);
    expect(service.userId).toBe(2);
    expect(service.user).toBe(2);
  });
});
