import { makeGetChargeUseCase } from '@/use-cases/factories/make-get-charge-use-case';
import { makeGetCheckoutUseCase } from '@/use-cases/factories/make-get-checkout-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getCheckout(req: FastifyRequest, reply: FastifyReply) {
	const getCheckoutParamsSchema = z.object({
		slug: z.string(),
	});

	const { slug } = getCheckoutParamsSchema.parse(req.params);

	const getCheckoutUseCase = makeGetCheckoutUseCase();
	const getChargeUseCase = makeGetChargeUseCase();

	const { checkout } = await getCheckoutUseCase.execute({ slug: slug });

	const { charge } = await getChargeUseCase.execute({ chargeId: checkout.chargeId });

	return reply.status(200).send({ checkout, charge });
}
