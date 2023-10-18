import { beforeEach, describe, it } from 'vitest';
import { CreateClientAddressUseCase } from './create-client-address';
import { UsersClientsAddressesRepository } from '@/repositories/interfaces/users-clients-addresses-repository';

let clientsAddressesRepository: UsersClientsAddressesRepository;
let sut: CreateClientAddressUseCase;

describe('Create client address use case', () => {
	beforeEach(() => {});

	it.todo('should create a client address correctly', async () => {});
});
