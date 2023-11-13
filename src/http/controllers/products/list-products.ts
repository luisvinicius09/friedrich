import { makeListProductsUseCase } from '@/use-cases/factories/make-list-products-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function listProducts(req: FastifyRequest, reply: FastifyReply) {
	const userId = req.user.sub;

	const listProductsUseCase = makeListProductsUseCase();

	const { products } = await listProductsUseCase.execute(userId);

	return reply.status(200).send({ products });
}
