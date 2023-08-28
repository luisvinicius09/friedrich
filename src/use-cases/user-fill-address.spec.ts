import { InMemoryUsersAddressesRepository } from '@/repositories/in-memory/in-memory-users-addresses-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersAddressesRepository } from '@/repositories/interfaces/users-addresses-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { beforeEach, describe, expect, it } from 'vitest';

let usersRepository: UsersRepository;
let sut: UsersAddressesRepository;

describe('User fill address use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new InMemoryUsersAddressesRepository();
	});

	it('should fill the user address', async () => {
		const user = await usersRepository.create({
			name: 'John Doe',
			document: '123456789',
			email: 'john-doe@gmail.com',
			password: 'jow-doe-pw',
			phoneNumber: 12345678,
		});

		const userAddress = await sut.create({
			userId: user.id,
			neighborhood: 'Joe Doe Neighborhood',
			number: '1234',
			street: 'Joe Doe Street',
			complement: 'Joe Doe Complement',
		});

		expect(userAddress.id).toEqual(expect.any(String));
		expect(userAddress.neighborhood).toEqual('Joe Doe Neighborhood');
		expect(userAddress.number).toEqual('1234');
		expect(userAddress.street).toEqual('Joe Doe Street');
		expect(userAddress.complement).toEqual('Joe Doe Complement');
		expect(userAddress.userId).toEqual(user.id);
	});
});
