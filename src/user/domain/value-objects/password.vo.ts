import { CustomBadRequestException } from '@common/exceptions';

export class PasswordVO {
  private readonly value: string;

  constructor(password: string) {
    this.validate(password);
    this.value = password;
  }

  private validate(password: string) {
    if (password.length < 8) {
      throw new CustomBadRequestException('비밀번호는 8자리 이상이어야 합니다');
    }

    if (password.length > 15) {
      throw new CustomBadRequestException('비밀번호는 15자리 이하여야 합니다');
    }

    if (!password.match(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
      throw new CustomBadRequestException('비밀번호는 특수문자를 포함해야 합니다');
    }
  }

  getValue(): string {
    return this.value;
  }
}
