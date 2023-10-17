import { beforeEach, describe, it } from 'vitest';
import { GetClientAddressUseCase } from './get-client-address';
import { UsersClientsAddressesRepository } from '@/repositories/interfaces/users-clients-addresses-repository';

let usersClientsAddressesRepository: UsersClientsAddressesRepository;
let sut: GetClientAddressUseCase;

describe('Get client address use case', () => {
	beforeEach(() => {
		usersClientsAddressesRepository = new InMemoryUsersClientsAddressesRepository();

		sut = new GetClientAddressUseCase(usersClientsAddressesRepository);
	});

	it.todo('should return the client address correctly', async () => {});
});
