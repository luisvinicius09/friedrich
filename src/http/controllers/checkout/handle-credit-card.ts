import { FastifyReply, FastifyRequest } from 'fastify';
import { format } from 'date-fns';
import { z } from 'zod';
import { makeGetChargeBySlugUseCase } from '@/use-cases/factories/make-get-charge-by-slug-use-case';
import { makeGetCheckoutUseCase } from '@/use-cases/factories/make-get-checkout-use-case';
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case';
import { makeUpdateChargeUseCase } from '@/use-cases/factories/make-update-charge-use-case';
import { makeUpdateCheckoutUseCase } from '@/use-cases/factories/make-update-checkout-use-case';
import { WePaymentsIntegration } from '@/integrations/wepayments-integration';

export async function handleCreditCard(req: FastifyRequest, reply: FastifyReply) {
	const handlePixSchema = z.object({
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

	const wePaymentsIntegration = new WePaymentsIntegration();

	try {
		const { slug, client } = handlePixSchema.parse(req.body);

		const { checkout } = await getCheckoutUseCase.execute({ slug: slug });
		const { charge } = await getChargeBySlugUseCase.execute({ slug });
		const { user } = await getUserUseCase.execute({ userId: charge.userId });

		const { data } = await wePaymentsIntegration.createWePaymentsCharge('credit-card', {
			amountInCents: charge.amountInCents,
			expireDate: format(new Date(charge.expireDate), 'yyyy-MM-dd') + 'T23:59:59',
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

		// TODO fix credit card stuff
		// 		'buyer.email': [ 'O campo buyer.email é obrigatório.' ],
		// 		product_info: [ 'O campo product info é obrigatório.' ],
		// 		statement_descriptor: [ 'O campo statement descriptor é obrigatório.' ]

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
	} catch (err) {
		return reply.status(500).send({ message: 'Internal Error' });
	}
}
