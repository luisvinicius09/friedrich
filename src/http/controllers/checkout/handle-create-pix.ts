import { FastifyReply, FastifyRequest } from 'fastify';
import { format } from 'date-fns';
import { z } from 'zod';
import { makeGetChargeBySlugUseCase } from '@/use-cases/factories/make-get-charge-by-slug-use-case';
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case';
import { WePaymentsIntegration } from '@/integrations/wepayments-integration';
import { makeGetCheckoutUseCase } from '@/use-cases/factories/make-get-checkout-use-case';
import { makeUpdateChargeUseCase } from '@/use-cases/factories/make-update-charge-use-case';
import { makeUpdateCheckoutUseCase } from '@/use-cases/factories/make-update-checkout-use-case';
import { makeGetClientUseCase } from '@/use-cases/factories/make-get-client-use-case';
import { makeGetClientAddressUseCase } from '@/use-cases/factories/make-get-client-address-use-case';
import { makeCreateClientUseCase } from '@/use-cases/factories/make-create-client-use-case';
import { makeCreateClientAddressUseCase } from '@/use-cases/factories/make-create-client-address-use-case';

interface HandleCreatePaymentClientDTO {
	name: string;
	document: string;
	documentType: 'CPF' | 'CNPJ';
	email: string;
	address: {
		city: string;
		complement: string;
		district: string;
		number: string;
		stateCode: string;
		street: string;
		zipCode: string;
	};
}

export async function handleCreatePix(req: FastifyRequest, reply: FastifyReply) {
	const handlePixSchema = z.object({
		slug: z.string(),

		client: z
			.object({
				name: z.string(),
				document: z.string(),
				documentType: z.enum(['CPF', 'CNPJ']),
				email: z.string().email(),
				phoneNumber: z.number(),
				address: z.object({
					city: z.string(),
					complement: z.string(),
					district: z.string(),
					number: z.string(),
					stateCode: z.string(),
					street: z.string(),
					zipCode: z.string(),
				}),
			})
			.or(z.string()),
	});

	const getChargeBySlugUseCase = makeGetChargeBySlugUseCase();
	const getCheckoutUseCase = makeGetCheckoutUseCase();
	const getUserUseCase = makeGetUserUseCase();
	const updateChargeUseCase = makeUpdateChargeUseCase();
	const updateCheckoutUseCase = makeUpdateCheckoutUseCase();

	const getUserClientUseCase = makeGetClientUseCase();
	const getUserClientAddressUseCase = makeGetClientAddressUseCase();

	const createUserClientUseCase = makeCreateClientUseCase();
	const createUserClientAddressUseCase = makeCreateClientAddressUseCase();

	const wePaymentsIntegration = new WePaymentsIntegration();

	try {
		const { slug, client: clientInfo } = handlePixSchema.parse(req.body);

		const { checkout } = await getCheckoutUseCase.execute({ slug: slug });
		const { charge } = await getChargeBySlugUseCase.execute({ slug });
		const { user } = await getUserUseCase.execute({ userId: charge.userId });

		let client: HandleCreatePaymentClientDTO;

		if (typeof clientInfo === 'string') {
			const { client: fetchedClient } = await getUserClientUseCase.execute({
				clientId: clientInfo,
			});
			const { clientAddress: fetchedClientAddress } =
				await getUserClientAddressUseCase.execute({
					clientId: clientInfo,
				});

			client = {
				name: fetchedClient.name,
				document: fetchedClient.document,
				documentType: fetchedClient.documentType,
				email: fetchedClient.email,
				address: {
					city: fetchedClientAddress.city,
					complement: fetchedClientAddress.complement ?? '',
					district: fetchedClientAddress.district,
					number: fetchedClientAddress.number,
					stateCode: fetchedClientAddress.stateCode,
					street: fetchedClientAddress.street,
					zipCode: fetchedClientAddress.zipCode,
				},
			};
		} else {
			const { userClient } = await createUserClientUseCase.execute({
				name: clientInfo.name,
				userId: user.id,
				document: clientInfo.document,
				documentType: clientInfo.documentType,
				email: clientInfo.email,
				phoneNumber: clientInfo.phoneNumber, // TODO: fix phone number
			});

			await createUserClientAddressUseCase.execute({
				city: clientInfo.address.city,
				clientId: userClient.id,
				complement: clientInfo.address.complement,
				district: clientInfo.address.district,
				number: clientInfo.address.number,
				stateCode: clientInfo.address.stateCode,
				street: clientInfo.address.street,
				zipCode: clientInfo.address.zipCode,
			});

			client = clientInfo;
		}

		const { data } = await wePaymentsIntegration.createWePaymentsCharge('pix', {
			amountInCents: charge.amountInCents,
			expireDate: format(new Date(charge.expireDate), 'yyyy-MM-dd') + 'T23:59:59',
			buyer: {
				name: client.name,
				documentNumber: client.document,
				documentType: client.documentType,
				email: client.email,
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

		// TODO: return info to display pix, info to display price, email and phone number

		return reply.status(201).send({ message: 'Ok' });
	} catch (err) {
		return reply.status(500).send({ message: 'Internal Error' });
	}
}
