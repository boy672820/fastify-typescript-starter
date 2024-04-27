import fp from 'fastify-plugin';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().min(1),
  DATABASE_URL: z.string().min(1),
});

function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errorMessage = result.error.errors.reduce<string>(
      (acc, error) => `${acc}${error.path?.[0]}(${error.message}), `,
      '',
    );
    throw new Error(`Invalid environment variables: ${errorMessage}`);
  }
}

export default fp((_, __, next) => {
  validateEnv();
  next();
});
