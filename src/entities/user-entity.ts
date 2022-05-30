import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  name?: string | undefined;
}
