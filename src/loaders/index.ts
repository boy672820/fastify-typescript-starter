import { FastifyInstance } from 'fastify';
import { AppOptions, app } from './fastify';
import mongoose from './mongoose';
import logger from './logger';
import dependencyInjector from './dependencyInjector';

export default async (
  fastify: FastifyInstance,
  options: AppOptions,
): Promise<void> => {
  await mongoose();
  logger.info('Connected to MongoDB');

  dependencyInjector();

  await app(fastify, options);
};
