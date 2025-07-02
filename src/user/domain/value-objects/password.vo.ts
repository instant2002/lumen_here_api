import * as crypto from 'crypto';

import * as bcrypt from 'bcryptjs';

export class PasswordValueObject {
  private readonly value: string;
  private readonly salt: string;

  constructor(password: string, salt?: string) {
    this.validate(password);
    this.value = password;
    this.salt = salt || this.generateSalt();
  }

  // 이미 검증된 비밀번호를 위한 팩토리 메서드
  static fromValidated(password: string, salt?: string): PasswordValueObject {
    const instance = Object.create(PasswordValueObject.prototype);
    instance.value = password;
    instance.salt = salt || instance.generateSalt();
    return instance;
  }

  // 해시된 비밀번호와 salt로부터 생성하는 팩토리 메서드
  static fromHashed(hashedPassword: string, salt: string): PasswordValueObject {
    const instance = Object.create(PasswordValueObject.prototype);
    instance.value = hashedPassword;
    instance.salt = salt;
    return instance;
  }

  private validate(password: string): void {
    if (password.length < 8) {
      throw new Error('8자리 이상 입력해 주세요');
    }
  }

  private generateSalt(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  hashPassword(): string {
    // salt와 비밀번호를 결합하여 해시
    const saltedPassword = this.value + this.salt;
    return bcrypt.hashSync(saltedPassword, 12);
  }

  verifyPassword(plainPassword: string): boolean {
    const saltedPassword = plainPassword + this.salt;
    return bcrypt.compareSync(saltedPassword, this.value);
  }

  getValue(): string {
    return this.value;
  }

  getSalt(): string {
    return this.salt;
  }

  equals(other: PasswordValueObject): boolean {
    return this.value === other.value && this.salt === other.salt;
  }
}
