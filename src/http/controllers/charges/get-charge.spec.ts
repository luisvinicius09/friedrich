import { app } from '@/app';
import { _e2e_createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { _e2e_createCharge } from '@/utils/test/create-charge';
import { _e2e_createUserClient } from '@/utils/test/create-user-client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

let userToken: string;

describe('Get charge E2E', () => {
	beforeAll(async () => {
		await app.ready();

		userToken = await _e2e_createAndAuthenticateUser(app);
	});

	afterAll(async () => {
		await app.close();
	});

	it('should get a specific charge correctly', async () => {
		const client = await _e2e_createUserClient(app, userToken);

		const charge = await _e2e_createCharge(app, userToken, {
			userClientId: client.id,
		});

		const response = await request(app.server)
			.get(`/charge/${charge.id}`)
			.set({ Authorization: `Bearer ${userToken}` })
			.send();

		expect(response.status).toBe(200);
	});
});
