import { Arg, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { User } from '../entities/user-entity';
import { UserService } from '../services/user-service';
import { LoginResponse } from '../entities/login-response';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from '../env.config';

@Service()
@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => LoginResponse, { name: 'login' })
  async login(@Arg('email') email: string, @Arg('password') password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new Error('User not found');

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) throw new Error('Bad password');

    return {
      accessToken: sign({ userId: user.id }, config.secret, {
        expiresIn: config.expiresIn,
      }),
    } as LoginResponse;
  }
}
