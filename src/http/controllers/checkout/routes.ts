import { FastifyInstance } from 'fastify';
import { getCheckout } from './get-checkout';
import { handleCreateBoleto } from './handle-create-boleto';
import { handleCreatePix } from './handle-create-pix';

export async function checkoutsRoutes(app: FastifyInstance) {
	app.get('/checkout/:slug', getCheckout);

	app.post('/checkout/create/boleto', handleCreateBoleto);
	app.post('/checkout/create/pix', handleCreatePix);
	// app.post('/checkout/create/credit-card', handleCreateCreditCard);

	// TODO: create routes to create payments
	// (only requests coming from checkout can create a payment)
	// create some kinda of JWT to verify it
}
