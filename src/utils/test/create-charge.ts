import { Charge } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

interface CreateChargeOptions {
	userClientId: string;
	userProductId?: string | null;
}

export async function _e2e_createCharge(
	app: FastifyInstance,
	userToken: string,
	{ userClientId, userProductId = null }: CreateChargeOptions,
): Promise<Charge> {
	const chargeData = {
		userClientId: userClientId,
		userProductId: userProductId,
	};

	const response = await request(app.server)
		.post('/charge/create')
		.set({ Authorization: `Bearer ${userToken}` })
		.send(chargeData);

	const { charge } = response.body;

	return charge;
}
