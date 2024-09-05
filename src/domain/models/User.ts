import { LocalDateTime, Role } from '@lib/types';
import * as bcrypt from 'bcrypt';
import { ulid } from 'ulid';

export interface UserProps {
  id: string;
  username: string;
  password: string;
  nickname?: string | null;
  role: Role;
  createdDate: LocalDateTime;
  updatedDate: LocalDateTime;
}

export default class User implements UserProps {
  id!: string;
  username!: string;
  password!: string;
  nickname?: string | null;
  role!: Role;
  createdDate!: LocalDateTime;
  updatedDate!: LocalDateTime;

  private constructor(props: UserProps) {
    Object.assign(this, props);
  }

  static create(props: Pick<UserProps, 'username' | 'password' | 'nickname'>) {
    const saltOrRounds = 10;
    const user = new User({
      ...props,
      id: ulid(),
      password: bcrypt.hashSync(props.password, saltOrRounds),
      nickname: props.nickname || null,
      role: Role.Guest,
      createdDate: LocalDateTime.now(),
      updatedDate: LocalDateTime.now(),
    });
    return user;
  }

  static from = (props: UserProps) => new User(props);
}
