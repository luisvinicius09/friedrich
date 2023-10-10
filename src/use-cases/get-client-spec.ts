import { beforeEach } from 'node:test';
import { describe, expect, it } from 'vitest';
import { GetClientUseCase } from './get-client';
import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { InMemoryUsersClientsRepository } from '@/repositories/in-memory/in-memory-users-clients-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { _unit_createUser } from '@/utils/test/unit/create-user';
import { _unit_createUserClient } from '@/utils/test/unit/create-user-client';

let usersRepository: UsersRepository;
let usersClientsRepository: UsersClientsRepository;
let sut: GetClientUseCase;

describe('Get client use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		usersClientsRepository = new InMemoryUsersClientsRepository();
		sut = new GetClientUseCase(usersClientsRepository);
	});

	it('should get client correctly', async () => {
		const user = await _unit_createUser(usersRepository);

		const clientCreated = await _unit_createUserClient(user.id, usersClientsRepository);

		const { client } = await sut.execute({ clientId: clientCreated.id });

		expect(client.id).toEqual(clientCreated.id);
		expect(client.email).toEqual('client@email.com');
		expect(client.document).toEqual('123456789');
		expect(client.name).toEqual('Client 1');
		expect(client.phoneNumber).toEqual(123456789);
		expect(client.userId).toEqual(user.id);
	});
});
