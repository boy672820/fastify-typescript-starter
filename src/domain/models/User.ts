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
    const user = new User();
    user.id = ObjectId.create();
    user.username = props.username;
    user.password = bcrypt.hashSync(props.password, saltOrRounds);
    user.nickname = props.nickname || null;
    user.role = Role.Guest;
    user.createdDate = LocalDateTime.now();
    user.updatedDate = LocalDateTime.now();
    return user;
  }

  getId = () => this.id.getObjectId();
}
