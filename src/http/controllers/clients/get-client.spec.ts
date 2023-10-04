import { app } from '@/app';
import { _e2e_createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { _e2e_createUserClient } from '@/utils/test/create-user-client';

let userToken: string;

describe('Get client E2E', () => {
	beforeAll(async () => {
		await app.ready();

		userToken = await _e2e_createAndAuthenticateUser(app);
	});

	afterAll(async () => {
		await app.close();
	});

	it('should get a specific client correctly', async () => {
		const client = await _e2e_createUserClient(app, userToken);

		const response = await request(app.server)
			.get(`/client/${client.id}`)
			.set({ Authorization: `Bearer ${userToken}` })
			.send();

		expect(response.status).toBe(200);
	});
});
