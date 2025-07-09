import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ICryptoService } from '../../domain/services/crypto.service';

@Injectable()
export class BcryptService implements ICryptoService {
  hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
