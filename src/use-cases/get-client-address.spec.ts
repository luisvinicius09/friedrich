import { beforeEach, describe, expect, it } from 'vitest';
import { GetClientAddressUseCase } from './get-client-address';
import { UsersClientsAddressesRepository } from '@/repositories/interfaces/users-clients-addresses-repository';
import { InMemoryUsersClientsAddressesRepository } from '@/repositories/in-memory/in-memory-users-clients-addresses-repository';
import { _unit_createUserClient } from '@/utils/test/unit/create-user-client';
import { _unit_createUser } from '@/utils/test/unit/create-user';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryUsersClientsRepository } from '@/repositories/in-memory/in-memory-users-clients-repository';

let usersRepository: UsersRepository;
let usersClientsRepository: UsersClientsRepository;
let usersClientsAddressesRepository: UsersClientsAddressesRepository;
let sut: GetClientAddressUseCase;

describe('Get client address use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		usersClientsRepository = new InMemoryUsersClientsRepository();
		usersClientsAddressesRepository = new InMemoryUsersClientsAddressesRepository();

		sut = new GetClientAddressUseCase(usersClientsAddressesRepository);
	});

	it('should return the client address correctly', async () => {
		const user = await _unit_createUser(usersRepository);
		const client = await _unit_createUserClient(user.id, usersClientsRepository);

		await usersClientsAddressesRepository.create({
			city: 'City',
			district: 'District',
			number: '1231',
			stateCode: 'QWR',
			street: 'Street',
			userClientId: client.id,
			zipCode: '1243561',
			complement: '',
		});

		const { clientAddress } = await sut.execute({ clientId: client.id });

		expect(clientAddress.city).toEqual('City');
		expect(clientAddress.userClientId).toEqual(client.id);
	});
});
