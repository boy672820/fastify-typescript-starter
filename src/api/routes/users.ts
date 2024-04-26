import UserService from '@app/services/UserService';
import Container from 'typedi';
import { Route } from '../router';

const users: Route = (fastify, options) => {
  const { prefix } = options;

  fastify.get(`${prefix}/users`, async (request, reply) => {
    return reply.code(200).send({ users: [] });
  });

  fastify.post(`${prefix}/users`, async (request, reply) => {
    const userService = Container.get(UserService);
    const user = await userService.create({
      username: 'test',
      password: '123',
      nickname: '테스터',
    });
    return reply.code(201).send({ user });
  });
};

export default users;
