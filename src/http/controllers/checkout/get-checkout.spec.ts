import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import { _e2e_createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { _e2e_createChargeAndCheckout } from '@/utils/test/create-charge-and-checkout';
import { _e2e_createUserClient } from '@/utils/test/create-user-client';

let userToken: string;

describe('Get checkout E2E', () => {
	beforeAll(async () => {
		await app.ready();

		userToken = await _e2e_createAndAuthenticateUser(app);
	});

	afterAll(async () => {
		await app.close();
	});

	it('should get a specific checkout by slug', async () => {
		const client = await _e2e_createUserClient(app, userToken);

		const { checkout } = await _e2e_createChargeAndCheckout(app, userToken, {
			userClientId: client.id,
		});

		const response = await request(app.server)
			.get(`/checkout/${checkout.slug}`)
			.set({ Authorization: `Bearer ${userToken}` })
			.send();

		expect(response.status).toBe(200);
	});
});
