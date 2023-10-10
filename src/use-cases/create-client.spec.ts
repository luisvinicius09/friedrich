import { beforeEach, describe, expect, it } from 'vitest';
import { CreateClientUseCase } from './create-client';
import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryUsersClientsRepository } from '@/repositories/in-memory/in-memory-users-clients-repository';
import { _unit_createUser } from '@/utils/test/unit/create-user';

let usersRepository: UsersRepository;
let clientsRepository: UsersClientsRepository;
let sut: CreateClientUseCase;

describe('Create client use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		clientsRepository = new InMemoryUsersClientsRepository();
		sut = new CreateClientUseCase(clientsRepository);
	});

	it('should create the client correctly', async () => {
		const user = await _unit_createUser(usersRepository);

		const { userClient: client } = await sut.execute({
			document: '123456789',
			documentType: 'CPF',
			name: 'John Doe',
			phoneNumber: 123456789,
			userId: user.id,
			email: 'john@doe.com',
		});

		expect(client.id).toEqual(expect.any(String));
		expect(client.name).toEqual('John Doe');
	});
});
