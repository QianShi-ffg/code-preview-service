import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  private errorCode: any;

  constructor(message: string, errorCode: any) {
    super(message, HttpStatus.BAD_REQUEST);
    this.errorCode = errorCode;
  }

  getErrorCode(): any {
    return this.errorCode;
  }
}
