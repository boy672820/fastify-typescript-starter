import { LocalDateTime, ObjectId } from '@lib/types';
import { User as UserDomain } from '@domain/models';
import { Inject, Service } from 'typedi';
import { Model } from 'mongoose';
import { User } from '../models';
import InjectionTokens from '../InjectionTokens';
import type { Repository } from '@interfaces';
import type { UserDocument } from '../models/User';

@Service(InjectionTokens.UserRepository)
export default class UserRepository implements Repository<UserDomain> {
  constructor(@Inject(User.name) private readonly user: Model<UserDocument>) {}

  async findAll(): Promise<UserDomain[]> {
    const users = await this.user.find();
    return users.map((user) => this.toModel(user));
  }

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

  toModel<TModel extends UserDocument>(model: TModel): UserDomain {
    return UserDomain.from({
      id: ObjectId.from(model._id),
      username: model.username,
      password: model.password,
      nickname: model.nickname,
      role: model.role,
      createdDate: LocalDateTime.native(model.createdDate),
      updatedDate: LocalDateTime.native(model.updatedDate),
    });
  }
}
