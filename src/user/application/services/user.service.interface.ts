import { User } from '../../domain/entities/user.entity';

export interface IUserService {
  createUser(email: string, password: string, name?: string): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUserName(id: string, name: string): Promise<User>;
  updateUserPassword(id: string, password: string): Promise<User>;
  deleteUser(id: string): Promise<void>;
  validatePassword(user: User, password: string): Promise<boolean>;
}
