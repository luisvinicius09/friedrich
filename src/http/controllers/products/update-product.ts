import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeUpdateProductUseCase } from '@/use-cases/factories/make-update-product-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function updateProduct(req: FastifyRequest, reply: FastifyReply) {
	const updateProductParamsSchema = z.object({
		productId: z.string().uuid(),
	});

	const updateProductBodySchema = z.object({
		active: z.boolean(),
		fixedValue: z.boolean(),
		name: z.string(),
		value: z.number(),
	});

	const updateProductUseCase = makeUpdateProductUseCase();

	try {
		const { productId } = updateProductParamsSchema.parse(req.params);

		const { active, fixedValue, name, value } = updateProductBodySchema.parse(req.body);

		const { product } = await updateProductUseCase.execute({
			productId: productId,
			active,
			fixedValue,
			name,
			value,
		});

		return reply.status(200).send({ product });
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: err.message });
		}

		throw err;
	}
}
