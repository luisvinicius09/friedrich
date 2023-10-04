import { app } from '@/app';
import { _e2e_createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { _e2e_createUserClient } from '@/utils/test/create-user-client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

let userToken: string;

describe('List clients E2E', () => {
	beforeAll(async () => {
		await app.ready();

		userToken = await _e2e_createAndAuthenticateUser(app);
	});

	afterAll(async () => {
		await app.close();
	});

	it('should list clients correctly', async () => {
		[...Array(5)].forEach(async () => {
			await _e2e_createUserClient(app, userToken);
		});

		const response = await request(app.server)
			.get('/clients')
			.set({ Authorization: `Bearer ${userToken}` })
			.send();

		expect(response.status).toBe(200);
	});
});
