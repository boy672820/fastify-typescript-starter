import { FastifyInstance } from 'fastify';
import { AppOptions, app } from './fastify';
import logger from './logger';
import dependencyInjector from './dependencyInjector';

export default async (
  fastify: FastifyInstance,
  options: AppOptions,
): Promise<void> => {
  logger.info('Connected to Database!');

  dependencyInjector();

  await app(fastify, options);
};
