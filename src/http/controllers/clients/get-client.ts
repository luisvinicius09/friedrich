import { makeGetClientUseCase } from '@/use-cases/factories/make-get-client-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getClient(req: FastifyRequest, reply: FastifyReply) {
	const clientParamsSchema = z.object({
		clientId: z.string(),
	});

	const { clientId } = clientParamsSchema.parse(req.params);

	const getClientUseCase = makeGetClientUseCase();

	const { client } = await getClientUseCase.execute({ clientId });

	return reply.status(200).send({ client });
}
