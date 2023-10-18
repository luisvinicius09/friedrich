import { WePaymentsIntegration } from '@/integrations/wepayments-integration';
import { makeCreateChargeUseCase } from '@/use-cases/factories/make-create-charge-use-case';
import { makeCreateCheckoutUseCase } from '@/use-cases/factories/make-create-checkout-use-case';
import { makeGetClientAddressUseCase } from '@/use-cases/factories/make-get-client-address-use-case';
import { makeGetClientUseCase } from '@/use-cases/factories/make-get-client-use-case';
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case';
import { PaymentType } from '@prisma/client';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { FastifyReply, FastifyRequest } from 'fastify';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

export async function createCharge(req: FastifyRequest, reply: FastifyReply) {
	const chargeBodySchema = z.object({
		userClientId: z.string(),
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
	const getUserUseCase = makeGetUserUseCase();
	const getUserClientUseCase = makeGetClientUseCase();
	const getUserClientAddressUseCase = makeGetClientAddressUseCase();

	const wePaymentsIntegration = new WePaymentsIntegration();

	try {
		const { user } = await getUserUseCase.execute({ userId });
		const { client } = await getUserClientUseCase.execute({ clientId: userClientId });
		const { clientAddress } = await getUserClientAddressUseCase.execute({
			clientId: userClientId,
		});

		// TODO: this should be wrapped in a transaction

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

		// should this be created the first time the client access the checkout?

		// TODO: Should all be successful to continue
		const { data: pixData } = await wePaymentsIntegration.createWePaymentsCharge('pix', {
			amountInCents: amountInCents,
			expireDate: format(new Date(expireDate), 'yyyy-MM-dd') + 'T23:59:59',
			buyer: {
				name: client.name,
				documentNumber: client.document,
				documentType: client.documentType,
				address: {
					city: clientAddress.city,
					complement: clientAddress.complement ?? '',
					district: clientAddress.district,
					number: clientAddress.number,
					stateCode: clientAddress.stateCode,
					street: clientAddress.street,
					zipCode: clientAddress.zipCode,
				},
			},
			sender: {
				name: user.name,
				document: user.document,
			},
		});

		writeFileSync(
			path.join(__dirname, '..', '..', '..', '..', 'logs', 'request-pix-data.json'),
			JSON.stringify(pixData),
		);

		const { data: billetData } = await wePaymentsIntegration.createWePaymentsCharge(
			'boleto',
			{
				amountInCents: amountInCents,
				expireDate: format(new Date(expireDate), 'yyyy-MM-dd'),
				buyer: {
					name: client.name,
					documentNumber: client.document,
					documentType: client.documentType,
					address: {
						city: clientAddress.city,
						complement: clientAddress.complement ?? '',
						district: clientAddress.district,
						number: clientAddress.number,
						stateCode: clientAddress.stateCode,
						street: clientAddress.street,
						zipCode: clientAddress.zipCode,
					},
				},
				sender: {
					name: user.name,
					document: user.document,
				},
			},
		);

		writeFileSync(
			path.join(__dirname, '..', '..', '..', '..', 'logs', 'request-billet-data.json'),
			JSON.stringify(billetData),
		);

		// const { data: creditCardData } = await wePaymentsIntegration.createWePaymentsCharge(
		// 	'credit-card',
		// 	{
		// 		amountInCents: amountInCents,
		// 		expireDate: format(new Date(expireDate), 'yyyy-MM-dd') + 'T23:59:59',
		// 		buyer: {
		// 			name: client.name,
		// 			documentNumber: client.document,
		// 			documentType: client.documentType,
		// 			address: {
		// 				city: clientAddress.city,
		// 				complement: clientAddress.complement ?? '',
		// 				district: clientAddress.district,
		// 				number: clientAddress.number,
		// 				stateCode: clientAddress.stateCode,
		// 				street: clientAddress.street,
		// 				zipCode: clientAddress.zipCode,
		// 			},
		// 		},
		// 		sender: {
		// 			name: user.name,
		// 			document: user.document,
		// 		},
		// 	},
		// );

		// writeFileSync(
		// 	path.join(
		// 		__dirname,
		// 		'..',
		// 		'..',
		// 		'..',
		// 		'..',
		// 		'logs',
		// 		'request-credit-card-data.json',
		// 	),
		// 	JSON.stringify(creditCardData),
		// );

		// TODO fix credit card stuff
		// 		'buyer.email': [ 'O campo buyer.email é obrigatório.' ],
		// 		product_info: [ 'O campo product info é obrigatório.' ],
		// 		statement_descriptor: [ 'O campo statement descriptor é obrigatório.' ]

		return reply.status(200).send({ charge, checkout });
	} catch (err) {
		if (err instanceof AxiosError) {
			console.log(err.response?.data);

			return reply.status(500).send({ message: 'Internal Error' });
		}

		return err;
	}
}
