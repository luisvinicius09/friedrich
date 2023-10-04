import { makeListClientsUseCase } from '@/use-cases/factories/make-list-clients-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function listClients(req: FastifyRequest, reply: FastifyReply) {
	const userId = req.user.sub;

	const listClientsUseCase = makeListClientsUseCase();

	const { clients } = await listClientsUseCase.execute({ userId });

	return reply.status(200).send({ clients });
}
