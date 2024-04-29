import { ResponseEntity } from '@lib/responses';
import UserService from '@app/services/UserService';
import Container from 'typedi';
import { Route } from '../router';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  okResponseSchema,
  userCreateSchema,
  usersResponseSchema,
} from '../schemas';

const users: Route = (_fastify, options) => {
  const { prefix } = options;
  const fastify = _fastify.withTypeProvider<ZodTypeProvider>();

  fastify.get(
    `${prefix}/users`,
    { schema: { tags: ['users'], response: { 200: usersResponseSchema } } },
    async (_, reply) => {
      const userService = Container.get(UserService);
      const users = await userService.findAll();
      return reply.code(200).send(ResponseEntity.OK_WITH_DATA('', { users }));
    },
  );

  fastify.post(
    `${prefix}/users`,
    {
      schema: {
        tags: ['users'],
        body: userCreateSchema,
        response: { 201: okResponseSchema },
      },
    },
    async (request, reply) => {
      const userService = Container.get(UserService);
      const data = request.body;
      await userService.create({
        username: data.username,
        password: data.password,
        nickname: data?.nickname,
      });
      return reply.code(201).send(ResponseEntity.OK());
    },
  );
};

export default users;
