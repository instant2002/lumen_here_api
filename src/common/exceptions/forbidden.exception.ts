import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

/**
 * 403에러
 * 클라이언트가 해당 요청에 대한 권한이 없는 경우
 */
export class CustomForbiddenException extends BaseException {
  constructor(messageForDeveloper: string, errorObj?: { errorCode?: string }) {
    super(HttpStatus.FORBIDDEN, messageForDeveloper, errorObj);
  }
}
