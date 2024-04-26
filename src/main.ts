import 'reflect-metadata';
import config from '@config';
import fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import loaders from './loaders';
import { AppOptions } from './loaders/fastify';

const options: AppOptions = {
  prefix: '/api/v1',
};

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

async function main() {
  await loaders(server, options);
  const address = await server.listen({ port: config.port });
  console.log(`🐆 Server listening at ${address}`);
}

main();
