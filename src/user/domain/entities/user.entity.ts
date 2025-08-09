import { User } from '@prisma/client';
import { CreateUserInput } from '../../presentation/dto/input/create-user.input';
import { PasswordValueObject } from '../value-objects/password.vo';

export class UserEntity {
  constructor() {}

  id: number;
  email: string;
  password: string;
  salt: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  create(data: CreateUserInput): UserEntity {
    const password = new PasswordValueObject(data.password);

    this.email = data.email;
    this.password = password.getValue();
    this.salt = password.getSalt();
    this.name = data.name;
    return this;
  }

  prismaToEntity(prismaUser: User): UserEntity {
    this.id = prismaUser.id;
    this.email = prismaUser.email;
    this.password = prismaUser.password;
    this.salt = prismaUser.salt;
    this.name = prismaUser.name;
    this.createdAt = prismaUser.createdAt;
    this.updatedAt = prismaUser.updatedAt;

    return this;
  }
}
