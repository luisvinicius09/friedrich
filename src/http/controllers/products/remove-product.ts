import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeRemoveProductUseCase } from '@/use-cases/factories/make-remove-product-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function removeProduct(req: FastifyRequest, reply: FastifyReply) {
	const removeProductParamsSchema = z.object({
		productId: z.string().uuid(),
	});

	const removeProductUseCase = makeRemoveProductUseCase();

	try {
		const { productId } = removeProductParamsSchema.parse(req.params);

		await removeProductUseCase.execute({ productId });

		return reply.status(204).send();
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: err.message });
		}

		throw err;
	}
}
