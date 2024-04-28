import { ResponseEntity } from '@lib/responses';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.addHook('preSerialization', async (_, __, payload) => {
    if (payload instanceof ResponseEntity) {
      return {
        responseStatus: payload.responseStatus,
        message: payload.message,
        data: payload.data,
      };
    }

    return payload;
  });
});
