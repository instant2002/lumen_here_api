import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  findUniqueById(id: number): Promise<UserEntity | null>;
  findUniqueByEmail(email: string): Promise<UserEntity | null>;
}
