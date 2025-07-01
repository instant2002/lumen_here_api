import { User } from '../../user/domain/entities/user.entity';
import { UserOutput } from '../../user/interfaces/dto/user.output';

import { AuthOutput } from './auth.output';

export class AuthResponseDTO {
  static fromLogin(token: string, user: User): AuthOutput {
    const userOutput: UserOutput = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt || new Date(),
      updatedAt: user.updatedAt || new Date(),
    };

    return {
      token,
      user: userOutput,
    };
  }
}
