import { UserClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function _e2e_createUserClient(
	app: FastifyInstance,
	userToken: string,
): Promise<UserClient> {
	const clientData = {
		name: 'Client 1',
		document: '123456789',
		phoneNumber: 123456789,
		email: 'client@email.com',
	};

	const response = await request(app.server)
		.post('/client/create')
		.set({ Authorization: `Bearer ${userToken}` })
		.send(clientData);

	const { client } = response.body;

	return client;
}
