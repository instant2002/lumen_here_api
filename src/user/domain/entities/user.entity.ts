import { InvalidNameException } from '../exceptions/user-domain.exception';
import { IPasswordEncryptionService } from '../services/password-encryption.service';
import { HashedPassword, PasswordVO } from '../value-objects/password.vo';

export class UserEntity {
  private readonly _id?: number;
  private readonly _email: string;
  private readonly _hashedPassword: HashedPassword;
  private _name: string;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  private constructor({
    id,
    email,
    hashedPassword,
    name,
    createdAt,
    updatedAt,
  }: {
    id?: number;
    email: string;
    hashedPassword: HashedPassword;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = id;
    this._email = email;
    this._hashedPassword = hashedPassword;
    this._name = name;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  static create({
    email,
    plainPassword,
    name,
    encryptionService,
  }: {
    email: string;
    plainPassword: PasswordVO;
    name: string;
    encryptionService: IPasswordEncryptionService;
  }): UserEntity {
    UserEntity.validateName(name);

    const { hashedPassword, salt } = encryptionService.hashPassword(plainPassword);
    const hashedPasswordVO = new HashedPassword(hashedPassword, salt);

    return new UserEntity({
      email,
      hashedPassword: hashedPasswordVO,
      name,
    });
  }

  static reconstitute({
    id,
    email,
    hashedPassword,
    salt,
    name,
    createdAt,
    updatedAt,
  }: {
    id: number;
    email: string;
    hashedPassword: string;
    salt: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }): UserEntity {
    const hashedPasswordVO = new HashedPassword(hashedPassword, salt);

    return new UserEntity({
      id,
      email,
      hashedPassword: hashedPasswordVO,
      name,
      createdAt,
      updatedAt,
    });
  }

  verifyPassword(plainPassword: PasswordVO, encryptionService: IPasswordEncryptionService): boolean {
    return this._hashedPassword.verifyPassword(plainPassword, encryptionService);
  }

  changeName(newName: string): void {
    UserEntity.validateName(newName);
    this._name = newName;
  }

  private static validateName(name: string) {
    if (name.trim().length < 2) {
      throw new InvalidNameException('이름은 2자리 이상이어야 합니다');
    }

    if (name.trim().length > 10) {
      throw new InvalidNameException('이름은 10자리 이하여야 합니다');
    }
  }

  // Getters
  getId(): number | undefined {
    return this._id;
  }

  getEmail(): string {
    return this._email;
  }

  getName(): string {
    return this._name;
  }

  getHashedPassword(): string {
    return this._hashedPassword.getValue();
  }

  getSalt(): string {
    return this._hashedPassword.getSalt();
  }

  getCreatedAt(): Date | undefined {
    return this._createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this._updatedAt;
  }

  // Legacy getters for backward compatibility (제거 예정)
  get id() {
    return this.getId();
  }
  get email() {
    return this.getEmail();
  }
  get name() {
    return this.getName();
  }
  get password() {
    return this.getHashedPassword();
  }
  get salt() {
    return this.getSalt();
  }
  get createdAt() {
    return this.getCreatedAt();
  }
  get updatedAt() {
    return this.getUpdatedAt();
  }
}
