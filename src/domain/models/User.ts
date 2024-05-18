import { LocalDateTime, ObjectId, Role } from '@lib/types';
import * as bcrypt from 'bcrypt';

export interface UserProps {
  id: ObjectId;
  username: string;
  password: string;
  nickname?: string | null;
  role: Role;
  createdDate: LocalDateTime;
  updatedDate: LocalDateTime;
}

export default class User implements UserProps {
  id!: ObjectId;
  username!: string;
  password!: string;
  nickname?: string | null;
  role!: Role;
  createdDate!: LocalDateTime;
  updatedDate!: LocalDateTime;

  static create(props: Pick<UserProps, 'username' | 'password' | 'nickname'>) {
    const saltOrRounds = 10;
    const user = new User({
      ...props,
      id: ObjectId.create(),
      password: bcrypt.hashSync(props.password, saltOrRounds),
      nickname: props.nickname || null,
      role: Role.Guest,
      createdDate: LocalDateTime.now(),
      updatedDate: LocalDateTime.now(),
    });
    return user;
  }

  static from = (props: UserProps) => new User(props);

  private constructor(props: UserProps) {
    Object.assign(this, props);
  }

  getId = () => this.id.getObjectId();

  toObject = () => ({
    id: this.id.getObjectId().toString(),
    username: this.username,
    nickname: this.nickname,
    role: this.role,
    createdDate: this.createdDate.toNative(),
    updatedDate: this.updatedDate.toNative(),
  });
}
