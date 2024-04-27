import { HttpException, InternalServerErrorException } from '@lib/errors';
import fp from 'fastify-plugin';
import Container from 'typedi';
import { Logger } from 'winston';
import InjectionTokens from '../InjectionTokens';

const errorFromHttp = (httpException: HttpException) => ({
  statusCode: httpException.statusCode,
  message: httpException.message,
});

export default fp(async (fastify) => {
  fastify.setErrorHandler((errorOrHttp, _, reply) => {
    if (errorOrHttp instanceof HttpException) {
      return reply
        .code(errorOrHttp.statusCode)
        .send(errorFromHttp(errorOrHttp));
    }

    const logger = Container.get<Logger>(InjectionTokens.Logger);
    logger.error(errorOrHttp);

    reply.code(500).send(errorFromHttp(new InternalServerErrorException()));
  });
});
