import { makeGetChargeUseCase } from '@/use-cases/factories/make-get-charge-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getCharge(req: FastifyRequest, reply: FastifyReply) {
	const chargeParamsSchema = z.object({
		chargeId: z.string(),
	});

	const { chargeId } = chargeParamsSchema.parse(req.params);

	const getChargeUseCase = makeGetChargeUseCase();

	const { charge } = await getChargeUseCase.execute({ chargeId });

	return reply.status(200).send({ charge });
}
