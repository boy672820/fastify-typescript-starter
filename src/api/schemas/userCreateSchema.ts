import { z } from 'zod';

export default z.object({
  username: z.string().min(4).max(20),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    )
    .describe(
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
    ),
  nickname: z.string().min(2).max(20).optional(),
});
