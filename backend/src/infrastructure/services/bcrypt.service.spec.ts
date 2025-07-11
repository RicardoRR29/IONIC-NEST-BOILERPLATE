import { BcryptService } from './bcrypt.service';

describe('BcryptService', () => {
  const service = new BcryptService();

  it('hashes and compares', async () => {
    const hash = await service.hash('secret');
    expect(hash).not.toEqual('secret');
    const match = await service.compare('secret', hash);
    expect(match).toBe(true);
  });
});
