import { makeCreateClientAddressUseCase } from '@/use-cases/factories/make-create-client-address-use-case';
import { makeCreateClientUseCase } from '@/use-cases/factories/make-create-client-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createClient(req: FastifyRequest, reply: FastifyReply) {
	const createClientBodySchema = z.object({
		name: z.string(),
		document: z.string().min(11).max(11), // TODO Improve validation to accept CPF and CNPJ
		documentType: z.enum(['CPF', 'CNPJ']),
		phoneNumber: z.number(),
		email: z.string().email(),

		address: z.object({
			city: z.string(),
			complement: z.string(),
			number: z.string(),
			street: z.string(),
			zipCode: z.string(),
			stateCode: z.string(),
			district: z.string(),
		}),
	});

	const createClientUseCase = makeCreateClientUseCase();
	const createClientAddressUseCase = makeCreateClientAddressUseCase();

	const { name, document, documentType, phoneNumber, email, address } =
		createClientBodySchema.parse(req.body);

	const userId = req.user.sub;

	const { userClient: client } = await createClientUseCase.execute({
		userId,
		name,
		document,
		phoneNumber,
		email,
		documentType,
	});

	await createClientAddressUseCase.execute({
		city: address.city,
		clientId: client.id,
		complement: address.complement,
		number: address.number,
		street: address.street,
		district: address.district,
		stateCode: address.stateCode,
		zipCode: address.zipCode,
	});

	return reply.status(200).send({ client });
}
