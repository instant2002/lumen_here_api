import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../../../domain/entities/user.entity';

@ObjectType()
export class UserOutput {
  constructor(data: UserEntity) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
