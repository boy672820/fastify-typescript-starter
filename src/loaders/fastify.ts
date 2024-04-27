import { validateConfig } from '@config';
import { FastifyInstance, FastifyServerOptions } from 'fastify';
import plugins from '../plugins';
import router from '../api/router';

export interface AppOptions extends FastifyServerOptions {
  prefix?: string;
}

export const app = async (
  fastify: FastifyInstance,
  options: AppOptions,
): Promise<void> => {
  fastify.register(validateConfig);
  fastify.register(plugins, {});
  fastify.register(router, { prefix: options.prefix });
};
