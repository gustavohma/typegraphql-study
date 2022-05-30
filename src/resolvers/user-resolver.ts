import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { User } from '../entities/user-entity';
import { UserService } from '../services/user-service';
import { CreateUserInput } from '../inputs/create-user-input';
import { UpdateUserInput } from '../inputs/update-user-input';

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  async create(@Arg('data') data: CreateUserInput) {
    return await this.userService.create(data);
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Arg('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async update(@Arg('data') data: UpdateUserInput) {
    return await this.userService.update(data.id, data);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async delete(@Arg('id') id: string) {
    return await this.userService.delete(id);
  }
}
