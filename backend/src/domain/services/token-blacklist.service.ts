export interface ITokenBlacklistService {
  add(token: string, ttlSeconds: number): void;
  has(token: string): boolean;
}
