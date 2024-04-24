import config from '@config';
import fastify from 'fastify';
import loaders from './loaders';
import { AppOptions } from './loaders/fastify';

const options: AppOptions = {
  prefix: '/api/v1',
};

const server = fastify();

async function main() {
  await loaders(server, options);
  const address = await server.listen({ port: config.port });
  console.log(`🐆 Server listening at ${address}`);
}

main();
