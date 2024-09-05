import { Role } from '@lib/types';
import { z } from 'zod';
import { User } from '../../domain/models';
import { ResponseEntity, responseSchema } from '../../lib/responses';

type UserSchema = z.infer<typeof userSchema>;

const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  nickname: z.string().nullable(),
  role: z.nativeEnum(Role),
  createdDate: z.date(),
  updatedDate: z.date(),
});

export const usersResponseSchema = responseSchema(
  z.object({
    users: z.array(userSchema),
  }),
);

export const userCreateResponseSchema = responseSchema(z.string());

export default class UserResponse {
  static domainToUsers = (
    users: User[],
  ): ResponseEntity<{ users: UserSchema[] }> =>
    ResponseEntity.OK_WITH_DATA('', {
      users: users.map((user) => ({
        id: user.id,
        username: user.username,
        nickname: user.nickname ?? null,
        role: user.role,
        createdDate: user.createdDate.toNative(),
        updatedDate: user.updatedDate.toNative(),
      })),
    });

  static created = (): ResponseEntity<''> => ResponseEntity.OK();
}
