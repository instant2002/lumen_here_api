import { UserEntity } from '../../domain/entities/user.entity';

import { UserOutput } from './user.output';

export class UserResponseDTO {
  static fromUser(user: UserEntity): UserOutput {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt || new Date(),
      updatedAt: user.updatedAt || new Date(),
    };
  }

  static fromUserOrNull(user: UserEntity | null): UserOutput | null {
    return user ? this.fromUser(user) : null;
  }
}
