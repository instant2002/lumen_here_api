import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: any): Promise<UserOutput | null> {
    const currentUser = await this.userService.getUserById(user.userId);
    return UserResponseDTO.fromUserOrNull(currentUser);
  }

  @Mutation(() => UserOutput)
  async createUser(@Args('data') data: CreateUserInput): Promise<UserOutput> {
    const user = await this.userService.createUser(data.email, data.password, data.name);
    return UserResponseDTO.fromUser(user);
  }
}
