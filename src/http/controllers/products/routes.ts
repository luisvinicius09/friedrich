import { FastifyInstance } from 'fastify';
import { createProduct } from './create-product';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { removeProduct } from './remove-product';
import { updateProduct } from './update-product';

export async function productsRoutes(app: FastifyInstance) {
	app.post('/product/create', { onRequest: [verifyJwt] }, createProduct);

	app.put('/product/:productId', { onRequest: [verifyJwt] }, updateProduct);

	app.delete('/product/:productId', { onRequest: [verifyJwt] }, removeProduct);
}
