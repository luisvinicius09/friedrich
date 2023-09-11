import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Create Product E2E', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should create a product', async () => {
		await request(app.server).post('/register').send({
			name: 'Joe Doe',
			document: '132456789',
			email: 'joe@email.com',
			password: 'joe-doe-pw',
			phoneNumber: 123456798,
		});

		const userAuthenticated = await request(app.server).post('/authenticate').send({
			email: 'joe@email.com',
			password: 'joe-doe-pw',
		});

		const token = userAuthenticated.body.token;

		const response = await request(app.server)
			.post('/product/create')
			.set({ Authorization: `Bearer ${token}` })
			.send({
				name: 'Product 1',
				value: 1324,
				fixedValue: false,
				active: true,
			});

		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual({
			product: expect.objectContaining({
				id: expect.any(String),
				name: 'Product 1',
				value: 1324,
				fixedValue: false,
				active: true,
			}),
		});
	});

	it('should not create a product if the user is not authenticated', async () => {
		const response = await request(app.server).post('/product/create').send({
			name: 'Product 1',
			value: 1324,
			fixedValue: false,
			active: true,
		});

		expect(response.statusCode).toBe(401);
		expect(response.body).toEqual({ message: 'Unauthorized' });
	});
});
