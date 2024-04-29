import { responseSchema } from '@lib/responses';
import { Role } from '@lib/types';
import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  nickname: z.string().nullable().optional(),
  role: z.nativeEnum(Role),
  createdDate: z.date(),
  updatedDate: z.date(),
});

export default responseSchema(
  z.object({
    users: z.array(userSchema),
  }),
);
