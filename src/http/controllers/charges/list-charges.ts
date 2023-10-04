import { makeListChargesUseCase } from '@/use-cases/factories/make-list-charges-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function listCharges(req: FastifyRequest, reply: FastifyReply) {
	const userId = req.user.sub;

	const listChargesUseCase = makeListChargesUseCase();

	const { charges } = await listChargesUseCase.execute({ userId });

	return reply.status(200).send({ charges });
}
