import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.get('/health', { schema: { tags: ['health'] } }, async (_, reply) => {
    return reply.status(200).header('accept', 'application/json').send();
  });
  fastify.head(
    '/health',
    { schema: { tags: ['health'] } },
    async (_, reply) => {
      return reply.status(200).header('accept', 'application/json').send();
    },
  );
});
