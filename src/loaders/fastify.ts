import { FastifyInstance, FastifyServerOptions } from 'fastify';
import router from '../api/router';
import { validateConfig } from '../config';

export interface AppOptions extends FastifyServerOptions {
  prefix?: string;
}

export const app = async (
  fastify: FastifyInstance,
  options: AppOptions,
): Promise<void> => {
  fastify.register(validateConfig);
  fastify.register(router, { prefix: options.prefix });
};
