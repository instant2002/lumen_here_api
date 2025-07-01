import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserService } from '../../application/services/user.service';
import { CreateUserInput } from '../dto/create-user.input';
import { UserOutput } from '../dto/user.output';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserOutput)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserOutput> {
    const user = await this.userService.createUser(input.email, input.password, input.name);
    return user;
  }
}
