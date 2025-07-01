import * as bcrypt from 'bcryptjs';

export class PasswordValueObject {
  private readonly value: string;

  constructor(password: string) {
    this.validate(password);
    this.value = password;
  }

  // 이미 검증된 비밀번호를 위한 팩토리 메서드
  static fromValidated(password: string): PasswordValueObject {
    const instance = Object.create(PasswordValueObject.prototype);
    instance.value = password;
    return instance;
  }

  private validate(password: string): void {
    if (password.length < 8) {
      throw new Error('8자리 이상 입력해 주세요');
    }
  }

  hashPassword(): string {
    return bcrypt.hashSync(this.value, 10);
  }

  getValue(): string {
    return this.value;
  }

  equals(hashedPassword: string): boolean {
    return bcrypt.compareSync(this.value, hashedPassword);
  }
}
