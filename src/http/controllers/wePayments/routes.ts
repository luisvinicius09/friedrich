import { FastifyInstance } from 'fastify';
import handleChargeCallback from './handle-charge-callback';

export async function wePaymentsRoutes(app: FastifyInstance) {
	app.post('/wepayments/handleChargeCallback', handleChargeCallback);
}
