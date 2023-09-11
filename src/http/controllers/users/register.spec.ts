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

	it('should register a user', async () => {
		const response = await request(app.server).post('/register').send({
			name: 'Joe Doe',
			document: '132456789',
			email: 'joe@email.com',
			password: 'joe-doe-pw',
			phoneNumber: 123456798,
		});

		expect(response.statusCode).toBe(201);
	});
});
