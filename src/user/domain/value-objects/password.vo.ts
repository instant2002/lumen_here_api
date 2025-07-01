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
      throw new Error('Password must be at least 8 characters long');
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter, one uppercase letter, and one number');
    }
  }

  hashPassword(): string {
    return bcrypt.hashSync(this.value, 10);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PasswordValueObject): boolean {
    return this.value === other.value;
  }
}
