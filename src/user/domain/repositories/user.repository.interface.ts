import { User } from '@prisma/client';

import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: UserEntity): Promise<User>;
}
