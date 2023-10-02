import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { createUserClient } from '@/utils/test/create-user-client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

let userToken: string;

describe('Create charge E2E', () => {
	beforeAll(async () => {
		await app.ready();

		userToken = await createAndAuthenticateUser(app);
	});

	afterAll(async () => {
		await app.close();
	});

	it('should create a charge correctly', async () => {
		const client = await createUserClient(app, userToken);

		const response = await request(app.server)
			.post('/charge/create')
			.set({ Authorization: `Bearer ${userToken}` })
			.send({
				userClientId: client.id,
				userProductId: null,
			});

		expect(response.statusCode).toBe(200);
	});
});
