import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(
    public readonly internalCode: string,
    public readonly userMessage: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    public readonly meta?: unknown,
  ) {
    super({ internalCode, userMessage }, statusCode);
  }
}
