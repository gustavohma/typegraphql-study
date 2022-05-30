import { Field, InputType } from 'type-graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  name?: string | undefined;
}
