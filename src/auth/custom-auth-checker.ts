import { JwtPayload, verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import config from '../env.config';
import Container from 'typedi';
import { UserService } from '../services/user-service';
import { ContextType } from '../interfaces/context-type';

export const customAuthChecker: AuthChecker<ContextType> = async (
  { context },
  roles,
) => {
  try {
    const authorization = context.req.headers.authorization;
    if (!authorization) throw new Error('Not authenticated');

    const token = authorization.split(' ')[1];
    const payload = verify(token, config.secret) as JwtPayload;

    const userService = Container.get(UserService);
    const user = await userService.findOne(payload.userId);
    if (!user) throw new Error('Not authenticated');

    if (roles.length <= 0) return true;

    return roles.some((role) => user.roles.includes(role));
  } catch (err) {
    throw new Error('Not authenticated');
  }
};
