import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class CustomNotFoundException extends BaseException {
  constructor(messageForDeveloper: string, errorObj?: { errorCode?: string }) {
    super(HttpStatus.NOT_FOUND, messageForDeveloper, errorObj);
  }
}
