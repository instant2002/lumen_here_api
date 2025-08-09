export class PasswordVO {
  private readonly value: string;

  constructor(password: string) {
    this.validate(password);
    this.value = password;
  }

  private validate(password: string) {
    if (password.length < 8) {
      throw new Error('비밀번호는 8자리 이상이어야 합니다');
    }

    if (password.length > 20) {
      throw new Error('비밀번호는 20자리 이하여야 합니다');
    }

    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
      throw new Error('비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다');
    }
  }

  getValue(): string {
    return this.value;
  }
}
