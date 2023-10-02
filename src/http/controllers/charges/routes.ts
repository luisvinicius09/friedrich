import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createCharge } from './create-charge';

export async function chargesRoutes(app: FastifyInstance) {
	app.post('/charge/create', { onRequest: [verifyJwt] }, createCharge);
}
