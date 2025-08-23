import { InvalidPasswordException } from '../exceptions/user-domain.exception';

export abstract class Password {
  protected readonly value: string;

  constructor(password: string) {
    this.value = password;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }
}

export class PasswordVO extends Password {
  constructor(password: string) {
    super(password);
    this.validate(password);
  }

  private validate(password: string) {
    if (password.length < 8) {
      throw new InvalidPasswordException('비밀번호는 8자리 이상이어야 합니다');
    }

    if (password.length > 15) {
      throw new InvalidPasswordException('비밀번호는 15자리 이하여야 합니다');
    }

    if (!password.match(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
      throw new InvalidPasswordException('비밀번호는 특수문자를 포함해야 합니다');
    }
  }
}

export class HashedPassword extends Password {
  private readonly salt: string;

  constructor(hashedPassword: string, salt: string) {
    super(hashedPassword);
    this.salt = salt;
  }

  getSalt(): string {
    return this.salt;
  }

  verifyPassword(plainPassword: PasswordVO, encryptionService: IPasswordEncryptionService): boolean {
    const { hashedPassword } = encryptionService.hashPassword(plainPassword, this.salt);
    return this.value === hashedPassword;
  }
}

export interface IPasswordEncryptionService {
  hashPassword(plainPassword: PasswordVO, salt?: string): { hashedPassword: string; salt: string };
}
