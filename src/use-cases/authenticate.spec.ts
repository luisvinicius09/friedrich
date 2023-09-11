import { describe, expect, it, beforeEach } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { RegisterUseCase } from './register';

let usersRepository: UsersRepository;
let registerUseCase: RegisterUseCase;
let sut: AuthenticateUseCase;

describe('Authenticate use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		registerUseCase = new RegisterUseCase(usersRepository);
		sut = new AuthenticateUseCase(usersRepository);
	});

	it('should authenticate the user correctly', async () => {
		await registerUseCase.execute({
			document: '123456789',
			email: 'joe@email.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
			phoneNumber: 123456789,
		});

		const { user: authenticatedUser } = await sut.execute({
			email: 'joe@email.com',
			password: 'joe-doe-pw',
		});

		expect(authenticatedUser.id).toEqual(expect.any(String));
		expect(authenticatedUser.email).toEqual('joe@email.com');
	});

	it.todo('it should return an error if the user does not exist', () => {});

	it.todo('it should return an error if the email or password is invalid', () => {});
});
