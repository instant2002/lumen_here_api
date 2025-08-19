import { AuthService } from '@/auth/application/services/auth.service';
import { LoginInput } from '@/auth/presentation/dto/login.input';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String, { nullable: true })
  async login(@Args('data') data: LoginInput): Promise<string> {
    return this.authService.login(data);
  }
}
