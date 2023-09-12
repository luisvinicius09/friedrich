import { makeCreateClientUseCase } from '@/use-cases/factories/make-create-client-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createClient(req: FastifyRequest, reply: FastifyReply) {
	const createClientBodySchema = z.object({
		name: z.string(),
		document: z.string(),
		phoneNumber: z.number(),
	});

	const createClientUseCase = makeCreateClientUseCase();

	const { name, document, phoneNumber } = createClientBodySchema.parse(req.body);

	const userId = req.user.sub;

	const { userClient: client } = await createClientUseCase.execute({
		userId,
		name,
		document,
		phoneNumber,
	});

	return reply.status(200).send({ client });
}
