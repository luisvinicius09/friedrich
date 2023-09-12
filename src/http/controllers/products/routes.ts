import { FastifyInstance } from 'fastify';
import { createProduct } from './create-product';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { removeProduct } from './remove-product';

export async function productsRoutes(app: FastifyInstance) {
	app.post('/product/create', { onRequest: [verifyJwt] }, createProduct);

	app.delete('/product/:productId', { onRequest: [verifyJwt] }, removeProduct);
}
