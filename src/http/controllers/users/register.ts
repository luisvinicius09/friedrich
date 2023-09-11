import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export default async function register(req: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string().min(5), // TODO: improve validation
		document: z.string().min(6), // TODO: improve validation
		email: z.string().email(),
		password: z.string().min(8).max(35),
		phoneNumber: z.number().min(6), // TODO: improve validation
	});

	const registerUseCase = makeRegisterUseCase();

	try {
		const { document, email, name, password, phoneNumber } = registerBodySchema.parse(
			req.body,
		);

		await registerUseCase.execute({
			document,
			email,
			name,
			password,
			phoneNumber,
		});

		return reply.status(201).send();
	} catch (err) {
		if (err instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: err.message });
		}

		throw err;
	}
}
