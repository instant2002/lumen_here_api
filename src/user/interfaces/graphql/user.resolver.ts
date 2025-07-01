import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from '../../application/services/user.service';
import { User } from '../../domain/entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UserOutput } from '../dto/user.output';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserOutput, { nullable: true })
  async getUserById(@Args('id') id: string): Promise<UserOutput | null> {
    const user = await this.userService.getUserById(id);
    if (!user) return null;

    return this.mapToUserOutput(user);
  }

  @Query(() => UserOutput, { nullable: true })
  async getUserByEmail(@Args('email') email: string): Promise<UserOutput | null> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) return null;

    return this.mapToUserOutput(user);
  }

  @Mutation(() => UserOutput)
  async createUser(@Args('data') data: CreateUserInput): Promise<UserOutput> {
    const user = await this.userService.createUser(data.email, data.password, data.name);
    return this.mapToUserOutput(user);
  }

  @Mutation(() => UserOutput)
  async updateUserName(@Args('id') id: string, @Args('name') name: string): Promise<UserOutput> {
    const user = await this.userService.updateUserName(id, name);
    return this.mapToUserOutput(user);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    await this.userService.deleteUser(id);
    return true;
  }

  private mapToUserOutput(user: User): UserOutput {
    return {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      createdAt: user.getCreatedAt() || new Date(),
      updatedAt: user.getUpdatedAt() || new Date(),
    };
  }
}
