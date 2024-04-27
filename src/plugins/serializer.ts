import fp from 'fastify-plugin';
import { ResponseEntity } from '../lib/types';

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
