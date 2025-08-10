import { CustomBadRequestException } from '@common/exceptions';

export class UserEntity {
  constructor({
    id,
    email,
    password,
    salt,
    name,
    createdAt,
    updatedAt,
  }: {
    id?: number;
    email: string;
    password: string;
    salt: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.salt = salt;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  id: number;
  email: string;
  password: string;
  salt: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  static create({
    password,
    email,
    name,
    salt,
  }: {
    password: string;
    email: string;
    name: string;
    salt: string;
  }): UserEntity {
    UserEntity.validateName(name);
    return new UserEntity({
      email,
      password,
      salt,
      name,
    });
  }

  private static validateName(name: string) {
    if (name.trim().length < 2) {
      throw new CustomBadRequestException('이름은 2자리 이상이어야 합니다');
    }

    if (name.trim().length > 10) {
      throw new CustomBadRequestException('이름은 10자리 이하여야 합니다');
    }
  }
}
