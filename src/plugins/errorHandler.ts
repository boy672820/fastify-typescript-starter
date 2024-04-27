import { HttpException, InternalServerErrorException } from '@lib/errors';
import fp from 'fastify-plugin';
import Container from 'typedi';
import { Logger } from 'winston';
import InjectionTokens from '../InjectionTokens';
import { ZodError } from 'zod';

const errorFromHttp = (httpException: HttpException) => ({
  statusCode: httpException.statusCode,
  message: httpException.message,
});

const errorFromZod = (zodError: ZodError) => ({
  statusCode: 400,
  message: 'Bad Request',
  errors: zodError.errors.map((error) => ({
    path: error.path,
    message: error.message,
    code: error.code,
  })),
});

export default fp(async (fastify) => {
  fastify.setErrorHandler((errorOrHttp, _, reply) => {
    if (errorOrHttp instanceof HttpException) {
      return reply
        .code(errorOrHttp.statusCode)
        .send(errorFromHttp(errorOrHttp));
    }

    if (errorOrHttp instanceof ZodError) {
      return reply.code(400).send(errorFromZod(errorOrHttp));
    }

    const logger = Container.get<Logger>(InjectionTokens.Logger);
    logger.error(errorOrHttp);

    reply.code(500).send(errorFromHttp(new InternalServerErrorException()));
  });
});
