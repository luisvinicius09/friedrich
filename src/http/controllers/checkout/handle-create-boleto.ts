import { FastifyReply, FastifyRequest } from 'fastify';
import { format } from 'date-fns';
import { z } from 'zod';
import { makeGetChargeBySlugUseCase } from '@/use-cases/factories/make-get-charge-by-slug-use-case';
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case';
import { WePaymentsIntegration } from '@/integrations/wepayments-integration';
import { makeUpdateChargeUseCase } from '@/use-cases/factories/make-update-charge-use-case';
import { makeUpdateCheckoutUseCase } from '@/use-cases/factories/make-update-checkout-use-case';
import { makeGetCheckoutUseCase } from '@/use-cases/factories/make-get-checkout-use-case';

export async function handleCreateBoleto(req: FastifyRequest, reply: FastifyReply) {
	const handleBoletoSchema = z.object({
		slug: z.string(),

		client: z.object({
			name: z.string(),
			document: z.string(),
			documentType: z.enum(['CPF', 'CNPJ']),
			address: z.object({
				city: z.string(),
				complement: z.string(),
				district: z.string(),
				number: z.string(),
				stateCode: z.string(),
				street: z.string(),
				zipCode: z.string(),
			}),
		}),
	});

	const getChargeBySlugUseCase = makeGetChargeBySlugUseCase();
	const getCheckoutUseCase = makeGetCheckoutUseCase();
	const getUserUseCase = makeGetUserUseCase();
	const updateChargeUseCase = makeUpdateChargeUseCase();
	const updateCheckoutUseCase = makeUpdateCheckoutUseCase();

	// const getUserClientUseCase = makeGetClientUseCase();
	// const getUserClientAddressUseCase = makeGetClientAddressUseCase();

	const wePaymentsIntegration = new WePaymentsIntegration();

	try {
		const { slug, client } = handleBoletoSchema.parse(req.body);

		const { checkout } = await getCheckoutUseCase.execute({ slug: slug });
		const { charge } = await getChargeBySlugUseCase.execute({ slug });
		const { user } = await getUserUseCase.execute({ userId: charge.userId });

		// const { client } = await getUserClientUseCase.execute({ clientId: userClientId });
		// const { clientAddress } = await getUserClientAddressUseCase.execute({
		// 	clientId: userClientId,
		// });

		const { data } = await wePaymentsIntegration.createWePaymentsCharge('boleto', {
			amountInCents: charge.amountInCents,
			expireDate: format(new Date(charge.expireDate), 'yyyy-MM-dd'),
			buyer: {
				name: client.name,
				documentNumber: client.document,
				documentType: client.documentType,
				address: {
					city: client.address.city,
					complement: client.address.complement ?? '',
					district: client.address.district,
					number: client.address.number,
					stateCode: client.address.stateCode,
					street: client.address.street,
					zipCode: client.address.zipCode,
				},
			},
			sender: {
				name: user.name,
				document: user.document,
			},
		});

		// Update charge status
		await updateChargeUseCase.execute({
			chargeId: charge.id,
			data: {
				statusId: 1,
				externalId: `${data.id}`,
			},
		});

		// Save extra info to checkout
		await updateCheckoutUseCase.execute({
			checkoutId: checkout.id,
			data: {
				externalId: `${data.id}`,
				digitableLine: data.digitableLine,
				barcodeNumber: data.barCodeNumber,
				paymentTypeChosen: 'BOLETO',
			},
		});

		return reply.status(201).send({ message: 'Ok' });
	} catch (err) {
		return reply.status(500).send({ message: 'Internal Error' });
	}
}
