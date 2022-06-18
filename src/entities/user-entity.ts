import { Roles } from '../enums/roles-enum';
import { Authorized, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  name?: string | undefined;

  @Authorized([Roles.ADMIN])
  @Field(() => String)
  password: string;

  @Field(() => [Roles])
  roles: [Roles];
}
