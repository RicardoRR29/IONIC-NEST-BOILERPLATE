import { JwtService } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

describe('JwtTokenService', () => {
  const jwt = new JwtService({ secret: 'test' });
  const service = new JwtTokenService(jwt);

  it('signs and verifies payloads', () => {
    const token = service.sign({ foo: 'bar' });
    const payload = service.verify(token) as any;
    expect(payload.foo).toBe('bar');
  });
});
