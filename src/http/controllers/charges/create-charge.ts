import { makeCreateChargeUseCase } from '@/use-cases/factories/make-create-charge-use-case';
import { makeCreateCheckoutUseCase } from '@/use-cases/factories/make-create-checkout-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createCharge(req: FastifyRequest, reply: FastifyReply) {
	const chargeBodySchema = z.object({
		userClientId: z.string(),
		userProductId: z.string().nullable(),
	});

	const { userClientId, userProductId } = chargeBodySchema.parse(req.body);

	const userId = req.user.sub;

	const createChargeUseCase = makeCreateChargeUseCase();

	const createCheckoutUseCase = makeCreateCheckoutUseCase();

	const { charge } = await createChargeUseCase.execute({
		userId,
		userClientId,
		userProductId,
	});

	const { checkout } = await createCheckoutUseCase.execute({
		userId,
		chargeId: charge.id,
	});

	return reply.status(200).send({ charge, checkout });
}
