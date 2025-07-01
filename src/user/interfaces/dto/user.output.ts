import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType()
export class UserOutput implements Pick<User, 'id' | 'email' | 'name' | 'createdAt' | 'updatedAt'> {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
