export class EmailValueObject {
  private readonly value: string;

  constructor(email: string) {
    this.validate(email);
    this.value = email.toLowerCase().trim();
  }

  // 이미 검증된 이메일을 위한 팩토리 메서드
  static fromValidated(email: string): EmailValueObject {
    const instance = Object.create(EmailValueObject.prototype);
    instance.value = email.toLowerCase().trim();
    return instance;
  }

  private validate(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: EmailValueObject): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
