import { makeGetCheckoutUseCase } from '@/use-cases/factories/make-get-checkout-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getCheckout(req: FastifyRequest, reply: FastifyReply) {
	const getCheckoutParamsSchema = z.object({
		slug: z.string(),
	});

	const { slug } = getCheckoutParamsSchema.parse(req.params);

	const getCheckoutUseCase = makeGetCheckoutUseCase();

	const { checkout } = await getCheckoutUseCase.execute({ slug: slug });

	return reply.status(200).send({ checkout });
}
