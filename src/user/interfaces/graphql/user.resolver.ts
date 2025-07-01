import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from '../../application/services/user.service';
import { CreateUserInput } from '../dto/create-user.input';
import { UserOutput } from '../dto/user.output';
import { UserResponseDTO } from '../dto/user.response.dto';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserOutput, { nullable: true })
  async getUserById(@Args('id') id: string): Promise<UserOutput | null> {
    const user = await this.userService.getUserById(id);
    return UserResponseDTO.fromUserOrNull(user);
  }

  @Query(() => UserOutput, { nullable: true })
  async getUserByEmail(@Args('email') email: string): Promise<UserOutput | null> {
    const user = await this.userService.getUserByEmail(email);
    return UserResponseDTO.fromUserOrNull(user);
  }

  @Mutation(() => UserOutput)
  async createUser(@Args('data') data: CreateUserInput): Promise<UserOutput> {
    const user = await this.userService.createUser(data.email, data.password, data.name);
    return UserResponseDTO.fromUser(user);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    await this.userService.deleteUser(id);
    return true;
  }
}
