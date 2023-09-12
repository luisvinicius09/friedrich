import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance) {
	const user = {
		name: 'Joe Doe',
		password: 'joe-doe-pw',
		document: '123456789',
		email: 'joe@email.com',
		phoneNumber: 123456789,
	};

	await request(app.server).post('/register').send(user);

	const response = await request(app.server).post('/authenticate').send({
		email: user.email,
		password: user.password,
	});

	const { token } = response.body;

	return token;
}
