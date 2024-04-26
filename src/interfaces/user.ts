import { Role } from '@lib/types';

export interface User {
  id: string;
  username: string;
  password: string;
  nickname: string;
  role: Role;
  createdDate: Date;
  updatedDate: Date;
}

export interface UserCreateInput {
  username: string;
  password: string;
  nickname?: string | null;
}
