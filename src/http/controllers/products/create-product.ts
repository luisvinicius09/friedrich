import { makeCreateProductUseCase } from '@/use-cases/factories/make-create-product-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createProduct(req: FastifyRequest, reply: FastifyReply) {
	const createProductBodySchema = z.object({
		name: z.string(),
		value: z.number(),
		fixedValue: z.boolean(),
		active: z.boolean(),
	});

	const createProductUseCase = makeCreateProductUseCase();

	const { name, value, fixedValue, active } = createProductBodySchema.parse(req.body);

	const userId = req.user.sub;

	const { userProduct: product } = await createProductUseCase.execute({
		userId,
		name,
		value,
		fixedValue,
		active,
	});

	return reply.status(201).send({ product });
}
