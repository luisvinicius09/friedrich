import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let inMemoryUserRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

beforeEach(() => {
	inMemoryUserRepository = new InMemoryUsersRepository();
	sut = new RegisterUseCase(inMemoryUserRepository);
});

describe('Register Use Case', () => {
	it('should hash the user password upon registration', async () => {
		const { user } = await sut.execute({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
			document: '12345678919',
			documentType: 'CPF',
			phoneNumber: 1234567890,
		});

		const isPasswordHashed = await compare('joe-doe-pw', user.password);

		expect(isPasswordHashed).toBe(true);
	});

	it('should register the user', async () => {
		const { user } = await sut.execute({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
			document: '12345678919',
			documentType: 'CPF',
			phoneNumber: 1234567890,
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should not register the user if the email is already in use', async () => {
		const email = 'joe@doe.com';
		await sut.execute({
			email,
			name: 'Joe Doe',
			password: 'joe-doe-pw',
			document: '12345678919',
			documentType: 'CPF',
			phoneNumber: 1234567890,
		});

		await expect(
			sut.execute({
				email,
				name: 'Joe Doe 2',
				password: 'joe-doe-pw',
				document: '12345678919',
				documentType: 'CPF',
				phoneNumber: 1234567890,
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
