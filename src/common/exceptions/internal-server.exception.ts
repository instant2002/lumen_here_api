import { HttpStatus } from '@nestjs/common';
import { BaseException } from '.';

/**
 * 500 에러
 */
export class CustomInternalServerException extends BaseException {
  constructor(messageForDeveloper: string, errorObj?: { errorCode?: string }) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, messageForDeveloper, errorObj);
  }
}
