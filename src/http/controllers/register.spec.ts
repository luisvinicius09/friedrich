import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Register E2E', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should register the user', async () => {
		const response = await request(app.server).post('/').send({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: 'joe-doe-pw',
		});

		expect(response.statusCode).toBe(201);
	});
});
