import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { LoginInput } from '../../user/interfaces/dto/login.input';
import { UserOutput } from '../../user/interfaces/dto/user.output';
import { AuthOutput } from '../dto/auth.output';
import { AuthService } from '../services/auth.service';

@Resolver(() => AuthOutput)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthOutput)
  async login(@Args('input') input: LoginInput): Promise<AuthOutput> {
    const { token, user } = await this.authService.login(input.email, input.password);

    const userOutput: UserOutput = {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      createdAt: user.getCreatedAt() || new Date(),
      updatedAt: user.getUpdatedAt() || new Date(),
    };

    return {
      token,
      user: userOutput,
    };
  }
}
