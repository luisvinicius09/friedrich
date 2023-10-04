import { app } from '@/app';
import { _e2e_createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { _e2e_createUserClient } from '@/utils/test/create-user-client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { _e2e_createCharge } from '@/utils/test/create-charge';

let userToken: string;

describe('List charges E2E', () => {
	beforeAll(async () => {
		await app.ready();

		userToken = await _e2e_createAndAuthenticateUser(app);
	});

	afterAll(async () => {
		await app.close();
	});

	it('should list charges correctly', async () => {
		const client = await _e2e_createUserClient(app, userToken);

		[...Array(5)].forEach(async () => {
			await _e2e_createCharge(app, userToken, { userClientId: client.id });
		});

		const response = await request(app.server)
			.get('/charges')
			.set({ Authorization: `Bearer ${userToken}` })
			.send();

		expect(response.status).toBe(200);
	});
});
