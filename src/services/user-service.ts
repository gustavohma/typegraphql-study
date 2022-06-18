import { Service } from 'typedi';
import { prisma } from '../prisma';
import { IDatabase } from '../interfaces/database-interface';
import { User } from '@prisma/client';

@Service()
export class UserService implements IDatabase<User> {
  create(data: Omit<User, 'id' | 'name'>): Promise<User | null> {
    return prisma.user.create({ data });
  }

  findAll(): Promise<User[] | null> {
    return prisma.user.findMany();
  }

  findOne(id: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { id } });
  }

  update(id: string, data: Partial<User>): Promise<User | null> {
    return prisma.user.update({ where: { id }, data });
  }

  delete(id: string): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { email } });
  }
}
