import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { LoginInput } from '../../user/interfaces/dto/login.input';
import { AuthOutput } from '../dto/auth.output';
import { AuthResponseDTO } from '../dto/auth.response.dto';
import { AuthService } from '../services/auth.service';

@Resolver(() => AuthOutput)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthOutput)
  async login(@Args('input') input: LoginInput): Promise<AuthOutput> {
    const { token, user } = await this.authService.login(input.email, input.password);
    return AuthResponseDTO.fromLogin(token, user);
  }
}
