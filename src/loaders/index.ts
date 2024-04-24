import { FastifyInstance } from 'fastify';
import { AppOptions, app } from './fastify';

export default async (
  fastify: FastifyInstance,
  options: AppOptions,
): Promise<void> => {
  await app(fastify, options);
};
