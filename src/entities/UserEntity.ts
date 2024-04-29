import { User } from '@domain/models';
import { Role } from '@lib/types';
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  nickname: z.string().nullable().optional(),
  role: z.nativeEnum(Role),
  createdDate: z.date(),
  updatedDate: z.date(),
});

export type UserSchema = z.infer<typeof userSchema>;

export default class UserEntity implements UserSchema {
  public id!: string;
  public username!: string;
  public nickname!: string | null;
  public role!: Role;
  public createdDate!: Date;
  public updatedDate!: Date;

  private constructor(props: UserSchema) {
    Object.assign(this, props);
  }

  static fromUsers = (users: User[]): UserEntity[] =>
    users.map((user) => new UserEntity(user.toObject()));
}
