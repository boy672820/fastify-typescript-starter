import UserService from '@domain/services/UserService';
import Container from 'typedi';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { Route } from '../router';
import { UserResponse, schemas } from '../responses';
import { userCreateSchema } from '../schemas';
import { FindAllUsersUseCase } from '../../application/usecases';

const users: Route = (_fastify, options) => {
  const { prefix } = options;
  const fastify = _fastify.withTypeProvider<ZodTypeProvider>();

  fastify.get(
    `${prefix}/users`,
    { schema: { tags: ['users'], response: { 200: schemas.users } } },
    async (_, reply) => {
      const findAllUsersUseCase = Container.get(FindAllUsersUseCase);
      const users = await findAllUsersUseCase.execute();
      return reply.code(200).send(UserResponse.domainToUsers(users));
    },
  );

  fastify.post(
    `${prefix}/users`,
    {
      schema: {
        tags: ['users'],
        body: userCreateSchema,
        response: { 201: schemas.userCreate },
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
      return reply.code(201).send(UserResponse.created());
    },
  );
};

export default users;
