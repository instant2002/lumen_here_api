import { User } from '@prisma/client';

import { EmailValueObject } from '../value-objects/email.vo';
import { PasswordValueObject } from '../value-objects/password.vo';

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
    id: string;
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

  id: string;
  email: string;
  password: string;
  salt: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  updatePassword(password: PasswordValueObject): void {
    this.password = password.getValue();
    this.salt = password.getSalt();
    this.updatedAt = new Date();
  }

  static create({
    id,
    email,
    password,
    name,
  }: {
    id: string;
    email: EmailValueObject;
    password: PasswordValueObject;
    name: string;
  }): UserEntity {
    return new UserEntity({
      id,
      email: email.getValue(),
      password: password.hashPassword(),
      salt: password.getSalt(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static revertToUserEntity(prismaUser: User): UserEntity {
    return new UserEntity({
      id: prismaUser.id,
      email: prismaUser.email,
      password: prismaUser.password,
      salt: prismaUser.salt,
      name: prismaUser.name,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    });
  }
}
