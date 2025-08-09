import { UserService } from '@/user/application/services/user.service';
import { Resolver } from '@nestjs/graphql';
import { UserOutput } from '../dto/input/output/user.output';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}
