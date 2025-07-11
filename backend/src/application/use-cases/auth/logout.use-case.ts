import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenBlacklistService } from '../../../domain/services/token-blacklist.service';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject('ITokenBlacklistService')
    private readonly blacklist: ITokenBlacklistService,
    private readonly jwt: JwtService,
  ) {}

  execute(token: string): void {
    let ttl = 0;
    try {
      const decoded: any = this.jwt.decode(token, { json: true });
      if (decoded?.exp) {
        ttl = decoded.exp - Math.floor(Date.now() / 1000);
      }
    } catch (e) {
      ttl = 0;
    }
    this.blacklist.add(token, ttl > 0 ? ttl : 0);
  }
}
