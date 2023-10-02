import { app } from '@/app';
import { _e2e_createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { randomUUID } from 'crypto';

let userToken: string;

describe('Remove product E2E', () => {
	beforeAll(async () => {
		await app.ready();

		userToken = await _e2e_createAndAuthenticateUser(app);
	});

	afterAll(async () => {
		await app.close();
	});

	it('should remove a product correctly', async () => {
		const productCreated = await request(app.server)
			.post('/product/create')
			.set({ Authorization: `Bearer ${userToken}` })
			.send({
				name: 'Product 1',
				value: 1324,
				fixedValue: false,
				active: true,
			});

		const productId = productCreated.body.product.id;

		const response = await request(app.server)
			.delete(`/product/${productId}`)
			.set({ Authorization: `Bearer ${userToken}` })
			.send();

		expect(response.statusCode).toBe(204);
	});

	it('should return an error if the product does not exist', async () => {
		const response = await request(app.server)
			.delete(`/product/${randomUUID().toString()}`)
			.set({ Authorization: `Bearer ${userToken}` })
			.send();

		expect(response.statusCode).toBe(404);
	});
});
