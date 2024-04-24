import { IsNumberString, validate } from 'class-validator';

class EnvironmentVariables {
  @IsNumberString()
  PORT!: number;
}

export default function validateConfig() {
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
