import { User } from '@prisma/client';

export class UserEntity {
  constructor(
    public readonly id: string,
    public email: string,
    public password: string,
    public name?: string,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  updatePassword(password: string): void {
    this.password = password;
    this.updatedAt = new Date();
  }

  static create({
    id,
    email,
    password,
    name,
  }: {
    id: string;
    email: string;
    password: string;
    name?: string;
  }): UserEntity {
    return new UserEntity(id, email, password, name, new Date(), new Date());
  }

  static revertToUserEntity(prismaUser: User): UserEntity {
    return new UserEntity(
      prismaUser.id,
      prismaUser.email,
      prismaUser.password,
      prismaUser.name,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }
}
