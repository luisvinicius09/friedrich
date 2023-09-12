import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

let userToken: string;

describe('Create Client E2E', () => {
	beforeAll(async () => {
		await app.ready();

		userToken = await createAndAuthenticateUser(app);
	});

	afterAll(async () => {
		await app.close();
	});

	it('should create a client', async () => {
		const response = await request(app.server)
			.post('/client/create')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				name: 'Client 1',
				document: '123456789',
				phoneNumber: 123456789,
			});

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			client: expect.objectContaining({
				id: expect.any(String),
				name: 'Client 1',
				document: '123456789',
				phoneNumber: 123456789,
			}),
		});
	});
});
