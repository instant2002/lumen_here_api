import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

/**
 * 401 에러
 * 클라이언트가 인증되지 않았거나, 유효한 인증정보 부족
 */
export class CustomUnauthorizedException extends BaseException {
  constructor(messageForDeveloper: string, errorObj?: { errorCode?: string }) {
    super(HttpStatus.UNAUTHORIZED, messageForDeveloper, errorObj);
  }
}
