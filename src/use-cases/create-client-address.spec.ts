import { beforeEach, describe, expect, it } from 'vitest';
import { CreateClientAddressUseCase } from './create-client-address';
import { UsersClientsAddressesRepository } from '@/repositories/interfaces/users-clients-addresses-repository';
import { InMemoryUsersClientsAddressesRepository } from '@/repositories/in-memory/in-memory-users-clients-addresses-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryUsersClientsRepository } from '@/repositories/in-memory/in-memory-users-clients-repository';
import { _unit_createUser } from '@/utils/test/unit/create-user';
import { _unit_createUserClient } from '@/utils/test/unit/create-user-client';

let usersRepository: UsersRepository;
let usersClientsRepository: UsersClientsRepository;
let clientsAddressesRepository: UsersClientsAddressesRepository;
let sut: CreateClientAddressUseCase;

describe('Create client address use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		usersClientsRepository = new InMemoryUsersClientsRepository();
		clientsAddressesRepository = new InMemoryUsersClientsAddressesRepository();
		sut = new CreateClientAddressUseCase(clientsAddressesRepository);
	});

	it('should create a client address correctly', async () => {
		const user = await _unit_createUser(usersRepository);
		const client = await _unit_createUserClient(user.id, usersClientsRepository);

		const { clientAddress } = await sut.execute({
			city: 'City',
			district: 'District',
			number: '1231',
			stateCode: 'QWR',
			street: 'Street',
			clientId: client.id,
			zipCode: '1243561',
			complement: '',
		});

		expect(clientAddress.city).toEqual('City');
		expect(clientAddress.userClientId).toEqual(client.id);
	});
});
