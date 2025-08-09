import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  findUniqueById(id: number): Promise<UserEntity>;
  findUniqueByEmail(email: string): Promise<UserEntity>;
}
