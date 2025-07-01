import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  name: string;
  updatedAt: Date;
  password: string;
  email: string;
  createdAt: Date;

  // Business methods
  updateName(name: string): void {
    this.name = name;
    this.updatedAt = new Date();
  }

  updatePassword(password: string): void {
    this.password = password;
    this.updatedAt = new Date();
  }

  // Factory method
  create(email: string, password: string, name?: string) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    return this;
  }
}
