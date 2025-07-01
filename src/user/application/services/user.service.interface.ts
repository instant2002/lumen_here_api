import { User } from '@prisma/client';

export interface IUserService {
  createUser(email: string, password: string, name: string): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
}
