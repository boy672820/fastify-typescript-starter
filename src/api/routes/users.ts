import { Route } from '../router';

const users: Route = (fastify, options) => {
  const { prefix } = options;

  fastify.get(`${prefix}/users`, async (request, reply) => {
    return reply.code(200).send({ users: [] });
  });

  fastify.post(`${prefix}/users`, async (request, reply) => {
    return reply.code(201).send({ user: {} });
  });
};

export default users;
