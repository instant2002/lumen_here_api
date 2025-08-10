import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  errorObj: { isSendHooks?: boolean; errorCode?: string };

  errorNumber: HttpStatus;

  constructor(errorNumber: HttpStatus, messageForDeveloper: string, errorObj?: { errorCode?: string }) {
    super(messageForDeveloper, errorNumber.valueOf());
    this.errorObj = errorObj;
    this.errorNumber = errorNumber;
  }

  getErrorCode() {
    return this.errorObj?.errorCode;
  }
}
