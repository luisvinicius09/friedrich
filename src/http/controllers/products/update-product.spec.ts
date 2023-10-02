import { app } from '@/app';
import { _e2e_createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

let userToken: string;

describe('Update product E2E', () => {
	beforeAll(async () => {
		await app.ready();

		userToken = await _e2e_createAndAuthenticateUser(app);
	});

	afterAll(async () => {
		await app.close();
	});

	it('should update the product correctly', async () => {
		const productCreated = await request(app.server)
			.post('/product/create')
			.set({ Authorization: `Bearer ${userToken}` })
			.send({
				active: true,
				fixedValue: false,
				name: 'Product 1',
				value: 1234,
			});

		const productId = productCreated.body.product.id;

		const response = await request(app.server)
			.put(`/product/${productId}`)
			.set({ Authorization: `Bearer ${userToken}` })
			.send({
				active: false,
				fixedValue: true,
				name: 'Product 1 Updated',
				value: 3214,
			});

		expect(response.statusCode).toBe(200);
	});
});
