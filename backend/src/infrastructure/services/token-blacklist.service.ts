import { Injectable } from '@nestjs/common';
import { ITokenBlacklistService } from '../../domain/services/token-blacklist.service';

interface Entry {
  expires: NodeJS.Timeout;
}

@Injectable()
export class TokenBlacklistService implements ITokenBlacklistService {
  private tokens = new Map<string, Entry>();

  add(token: string, ttlSeconds: number): void {
    if (ttlSeconds <= 0) ttlSeconds = 0;
    if (this.tokens.has(token)) return;
    const timeout = setTimeout(() => this.tokens.delete(token), ttlSeconds * 1000);
    this.tokens.set(token, { expires: timeout });
  }

  has(token: string): boolean {
    return this.tokens.has(token);
  }
}
