import PartialType from '../utils/partial-type';
import { Field, ID, InputType } from 'type-graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateUserInput } from './create-user-input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
