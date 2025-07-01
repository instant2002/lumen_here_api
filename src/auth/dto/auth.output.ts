import { Field, ObjectType } from '@nestjs/graphql';

import { UserOutput } from '../../user/interfaces/dto/user.output';

@ObjectType()
export class AuthOutput {
  @Field()
  token: string;

  @Field(() => UserOutput)
  user: UserOutput;
}
