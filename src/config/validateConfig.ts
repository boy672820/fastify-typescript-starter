import fp from 'fastify-plugin';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  validate,
} from 'class-validator';

class EnvironmentVariables {
  @IsNumberString()
  @IsNotEmpty()
  PORT!: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL!: string;
}

function validateEnv() {
  const env = new EnvironmentVariables();

  for (const key in process.env) {
    if (key in env) {
      (env as any)[key] = process.env[key];
    }
  }

  validate(env).then((errors) => {
    if (errors.length > 0) {
      throw new Error(`Config validation error: ${errors.join(', ')}`);
    }
  });
}

export default fp((_, __, next) => {
  validateEnv();
  next();
});
