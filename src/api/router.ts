import fp from 'fastify-plugin';
import routes from './routes';
import { FastifyInstance } from 'fastify';

export interface RouterOptions {
  prefix?: string;
}

export type Route = (fastify: FastifyInstance, options: RouterOptions) => void;

export default fp<RouterOptions>(async (fastify, options) => {
  routes.forEach((route) => {
    route(fastify, options);
  });
});
