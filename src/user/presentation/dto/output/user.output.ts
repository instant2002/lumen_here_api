import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  constructor({
    id,
    email,
    name,
    createdAt,
    updatedAt,
  }: {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
