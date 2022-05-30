import { User } from '../entities/user-entity';
import PartialType from '../utils/partial-type';
import { Field, ID, InputType } from 'type-graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(User) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
