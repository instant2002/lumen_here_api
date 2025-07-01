import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from '../../application/services/user.service';
import { CreateUserInput } from '../dto/create-user.input';
import { UserOutput } from '../dto/user.output';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserOutput, { nullable: true })
  async getUserById() {
    return null;
  }

  @Mutation(() => UserOutput)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserOutput> {
    const user = await this.userService.createUser(input.email, input.password, input.name);
    return user;
  }
}
