import { UserEntity } from '../../domain/entities/user.entity';

export interface IUserService {
  createUser(email: string, password: string, name?: string): Promise<UserEntity>;
  getUserById(id: string): Promise<UserEntity | null>;
  getUserByEmail(email: string): Promise<UserEntity | null>;
  updateUserName(id: string, name: string): Promise<UserEntity>;
  updateUserPassword(id: string, password: string): Promise<UserEntity>;
  deleteUser(id: string): Promise<void>;
  validatePassword(user: UserEntity, password: string): Promise<boolean>;
}
