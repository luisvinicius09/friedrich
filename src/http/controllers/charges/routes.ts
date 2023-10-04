import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createCharge } from './create-charge';
import { listCharges } from './list-charges';
import { getCharge } from './get-charge';

export async function chargesRoutes(app: FastifyInstance) {
	app.get('/charges', { onRequest: [verifyJwt] }, listCharges);

	app.get('/charge/:chargeId', { onRequest: [verifyJwt] }, getCharge);

	app.post('/charge/create', { onRequest: [verifyJwt] }, createCharge);
}
