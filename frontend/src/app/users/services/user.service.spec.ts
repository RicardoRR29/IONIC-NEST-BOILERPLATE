import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let http: HttpTestingController;
  const base = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should call findAll', () => {
    service.findAll().then();
    const req = http.expectOne(`${base}/users`);
    expect(req.request.method).toBe('GET');
  });

  it('should call get', () => {
    service.get(1).then();
    const req = http.expectOne(`${base}/users/1`);
    expect(req.request.method).toBe('GET');
  });

  it('should call create', () => {
    service.create('a','b','c').then();
    const req = http.expectOne(`${base}/users`);
    expect(req.request.method).toBe('POST');
  });

  it('should call update', () => {
    service.update(1,'n','e').then();
    const req = http.expectOne(`${base}/users/1`);
    expect(req.request.method).toBe('PUT');
  });

  it('should call delete', () => {
    service.delete(1).then();
    const req = http.expectOne(`${base}/users/1`);
    expect(req.request.method).toBe('DELETE');
  });
});
