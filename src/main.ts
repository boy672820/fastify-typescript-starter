import 'reflect-metadata';
import config from '@config';
import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod';
import loaders from './loaders';
import { AppOptions } from './loaders/fastify';

const options: AppOptions = {
  prefix: '/api/v1',
};

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifySwagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'fastify-typescript-starter',
      description: 'Fastify for Typescript starter',
      version: '1.0.0',
    },
    tags: [
      { name: 'health', description: 'Health check' },
      {
        name: 'users',
        description: 'User management',
      },
    ],
  },
  transform: jsonSchemaTransform,
});
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: { docExpansion: 'list', deepLinking: false },
});

async function main() {
  await loaders(server, options);
  const address = await server.listen({ port: config.port });
  console.log(`🐆 Server listening at ${address}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
