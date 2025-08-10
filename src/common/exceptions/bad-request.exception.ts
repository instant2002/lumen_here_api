import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class CustomBadRequestException extends BaseException {
  constructor(messageForDeveloper: string, errorObj?: { errorCode?: string }) {
    super(HttpStatus.BAD_REQUEST, messageForDeveloper, errorObj);
  }
}
