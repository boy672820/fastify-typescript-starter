import { ResponseEntity } from '@lib/responses';
import UserService from '@app/services/UserService';
import Container from 'typedi';
import { Route } from '../router';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { userCreateSchema } from '../schemas';

const users: Route = (_fastify, options) => {
  const { prefix } = options;
  const fastify = _fastify.withTypeProvider<ZodTypeProvider>();

  fastify.get(`${prefix}/users`, async (_, reply) => {
    const userService = Container.get(UserService);
    const users = await userService.findAll();
    return reply.code(200).send(ResponseEntity.OkWithData(users));
  });

  fastify.post(
    `${prefix}/users`,
    { schema: { body: userCreateSchema } },
    async (request, reply) => {
      const userService = Container.get(UserService);
      const data = request.body;
      const user = await userService.create({
        username: data.username,
        password: data.password,
        nickname: data?.nickname,
      });
      return reply.code(201).send({ user });
    },
  );
};

export default users;
