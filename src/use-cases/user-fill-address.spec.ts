import { InMemoryUsersAddressesRepository } from '@/repositories/in-memory/in-memory-users-addresses-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersAddressesRepository } from '@/repositories/interfaces/users-addresses-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserFillAddressUseCase } from './user-fill-address';
import { _unit_createUser } from '@/utils/test/unit/create-user';

let usersRepository: UsersRepository;
let usersAddressesRepository: UsersAddressesRepository;
let sut: UserFillAddressUseCase;

describe('User fill address use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		usersAddressesRepository = new InMemoryUsersAddressesRepository();
		sut = new UserFillAddressUseCase(usersAddressesRepository);
	});

	it('should fill the user address', async () => {
		const user = await _unit_createUser(usersRepository);

		const { userAddress } = await sut.execute({
			userId: user.id,
			city: 'City #1',
			district: 'District #1',
			stateCode: 'AB',
			zipCode: '123456789',
			number: '1234',
			street: 'Joe Doe Street',
			complement: 'Joe Doe Complement',
		});

		expect(userAddress.id).toEqual(expect.any(String));
		expect(userAddress.number).toEqual('1234');
		expect(userAddress.street).toEqual('Joe Doe Street');
		expect(userAddress.complement).toEqual('Joe Doe Complement');
		expect(userAddress.userId).toEqual(user.id);
	});
});
