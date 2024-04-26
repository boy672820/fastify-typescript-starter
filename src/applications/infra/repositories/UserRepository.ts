import { User as UserDomain } from '@domain/models';
import { Inject, Service } from 'typedi';
import { Model } from 'mongoose';
import { User } from '../models';
import InjectionTokens from '../InjectionTokens';
import type { Repository } from '../interfaces';
import type { UserDocument } from '../models/User';

@Service(InjectionTokens.UserRepository)
export default class UserRepository implements Repository<UserDomain> {
  constructor(@Inject(User.name) private readonly user: Model<UserDocument>) {}

  async create(user: UserDomain): Promise<void> {
    await this.user.create({
      _id: user.id.getObjectId(),
      username: user.username,
      password: user.password,
      nickname: user.nickname,
      role: user.role,
      createdDate: user.createdDate.toNative(),
      updatedDate: user.updatedDate.toNative(),
    });
  }
}
