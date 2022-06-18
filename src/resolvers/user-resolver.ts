import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { User } from '../entities/user-entity';
import { UserService } from '../services/user-service';
import { CreateUserInput } from '../inputs/create-user-input';
import { UpdateUserInput } from '../inputs/update-user-input';
import { Roles } from '../enums/roles-enum';
import bcrypt from 'bcrypt';

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  async create(@Arg('data') data: CreateUserInput) {
    const password = await bcrypt.hash(data.password, 10);
    return await this.userService.create({
      ...data,
      password,
      roles: [Roles.USER],
    });
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Arg('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Authorized([Roles.ADMIN])
  @Mutation(() => User, { name: 'updateUser' })
  async update(@Arg('data') data: UpdateUserInput) {
    return await this.userService.update(data.id, data);
  }

  @Authorized([Roles.ADMIN])
  @Mutation(() => User, { name: 'deleteUser' })
  async delete(@Arg('id') id: string) {
    return await this.userService.delete(id);
  }
}
