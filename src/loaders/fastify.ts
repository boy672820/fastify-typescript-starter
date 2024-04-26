import { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
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
  fastify.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'fastify-typescript-starter',
        description: 'Fastify for Typescript starter',
        version: '1.0.0',
      },
    },
  });
  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'full', deepLinking: false },
  });
};
