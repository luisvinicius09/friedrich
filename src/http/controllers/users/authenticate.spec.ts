import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Authenticate E2E', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should authenticate the user', async () => {
		await request(app.server).post('/register').send({
			name: 'Joe Doe',
			document: '132456789',
			email: 'joe@email.com',
			password: 'joe-doe-pw',
			phoneNumber: 123456798,
		});

		const response = await request(app.server).post('/authenticate').send({
			email: 'joe@email.com',
			password: 'joe-doe-pw',
		});

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
	});
});
