import { FastifyReply, FastifyRequest } from 'fastify';

export const errorHandler = (error: any, request: FastifyRequest, reply: FastifyReply) => {
    console.error(error);
    reply.status(500).send({ message: 'Internal Server Error' });
};
