import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwt: JwtService) {}

  sign(payload: any): string {
    return this.jwt.sign(payload);
  }

  verify(token: string): any {
    return this.jwt.verify(token);
  }
}
