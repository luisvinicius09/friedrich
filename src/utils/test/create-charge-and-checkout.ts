import { Charge, Checkout } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

interface CreateChargeOptions {
	userClientId: string;
	userProductId?: string | null;
}

export async function _e2e_createChargeAndCheckout(
	app: FastifyInstance,
	userToken: string,
	{ userClientId, userProductId = null }: CreateChargeOptions,
): Promise<{ charge: Charge; checkout: Checkout }> {
	const chargeData = {
		userClientId: userClientId,
		userProductId: userProductId,
	};

	const response = await request(app.server)
		.post('/charge/create')
		.set({ Authorization: `Bearer ${userToken}` })
		.send(chargeData);

	const { charge, checkout } = response.body;

	return { charge, checkout };
}
