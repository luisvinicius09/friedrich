import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { getCheckout } from './get-checkout';

export async function checkoutsRoutes(app: FastifyInstance) {
	app.get('/checkout/:slug', { onRequest: [verifyJwt] }, getCheckout);
}
