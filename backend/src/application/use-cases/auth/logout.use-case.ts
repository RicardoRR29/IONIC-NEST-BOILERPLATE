import { Injectable } from '@nestjs/common';

@Injectable()
export class LogoutUseCase {
  // For JWT stateless auth, logout can be handled client-side or with token blacklist.
  execute(): void {
    // no-op
  }
}
