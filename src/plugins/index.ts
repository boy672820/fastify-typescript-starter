import fp from 'fastify-plugin';
import healthCheck from './healthCheck';
import errorHandler from './errorHandler';
import serializer from './serializer';

export interface PluginOptions {}

export default fp<PluginOptions>(async (fastify, options) => {
  fastify.register(healthCheck);
  fastify.register(errorHandler);
  fastify.register(serializer);
});
