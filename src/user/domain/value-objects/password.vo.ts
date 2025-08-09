import * as crypto from 'crypto';

export class PasswordValueObject {
  constructor(password: string, salt?: string) {
    this.validate(password);
    this.value = password;
    this.salt = salt || this.generateSalt();
  }

  private readonly value: string;
  private readonly salt: string;

  private validate(password: string): void {
    if (password.length < 8) {
      throw new Error('8자리 이상 입력해 주세요');
    }
  }

  private generateSalt(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  getValue(): string {
    return this.value;
  }

  getSalt(): string {
    return this.salt;
  }
}
