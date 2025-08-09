import { User } from '@prisma/client';
import { CreateUserInput } from '../../presentation/dto/input/create-user.input';

export class UserEntity {
  constructor() {}

  id: number;
  email: string;
  password: string;
  salt: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  create({ data, password, salt }: { data: CreateUserInput; password: string; salt: string }): UserEntity {
    this.email = data.email;
    this.password = password;
    this.salt = salt;
    this.name = data.name;
    return this;
  }

  revertToUserEntity(prismaUser: User): UserEntity {
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
