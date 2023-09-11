import { FastifyInstance } from 'fastify';
import { CreateProduct } from './create-product';
import { verifyJwt } from '@/http/middlewares/verify-jwt';

export async function productsRoutes(app: FastifyInstance) {
	app.post('/product/create', { onRequest: [verifyJwt] }, CreateProduct);
}
