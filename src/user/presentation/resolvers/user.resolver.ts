import { UserService } from '@/user/application/services/user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from '../dto/input/create-user.input';
import { UserOutput } from '../dto/output/user.output';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserOutput)
  async getUser(@Args('id') id: number): Promise<UserOutput> {
    const user = await this.userService.findUnique(id);
    return new UserOutput(user);
  }

  @Mutation(() => UserOutput)
  async createUser(@Args('data') data: CreateUserInput): Promise<UserOutput> {
    const user = await this.userService.create(data);
    return new UserOutput(user);
  }
}
