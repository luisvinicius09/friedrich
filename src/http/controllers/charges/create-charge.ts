import { makeCreateChargeUseCase } from '@/use-cases/factories/make-create-charge-use-case';
import { makeCreateCheckoutUseCase } from '@/use-cases/factories/make-create-checkout-use-case';
import { PaymentType } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createCharge(req: FastifyRequest, reply: FastifyReply) {
	const chargeBodySchema = z.object({
		userClientId: z.string().nullable(),
		userProductId: z.string().nullable(),
		amountInCents: z.number(),
		expireDate: z.coerce.date().min(new Date()), // TODO: validation
		selectedPaymentTypes: z.array(
			z.enum([PaymentType.BOLETO, PaymentType.PIX, PaymentType.CREDIT_CARD]),
		),
	});

	const { userClientId, userProductId, amountInCents, expireDate, selectedPaymentTypes } =
		chargeBodySchema.parse(req.body);

	const userId = req.user.sub;

	const createChargeUseCase = makeCreateChargeUseCase();
	const createCheckoutUseCase = makeCreateCheckoutUseCase();

	const { charge } = await createChargeUseCase.execute({
		userId,
		userClientId,
		userProductId,
		amountInCents,
		expireDate,
		selectedPaymentTypes,
	});

	const { checkout } = await createCheckoutUseCase.execute({
		userId,
		chargeId: charge.id,
	});

	return reply.status(200).send({ charge, checkout });
}
