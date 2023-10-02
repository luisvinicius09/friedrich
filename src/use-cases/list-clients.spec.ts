import { beforeEach, describe, expect, it } from 'vitest';
import { ListClientsUseCase } from './list-clients';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryUsersClientsRepository } from '@/repositories/in-memory/in-memory-users-clients-repository';
import { _unit_createUser } from '@/utils/test/unit/create-user';
import { _unit_createUserClient } from '@/utils/test/unit/create-user-client';

let usersRepository: UsersRepository;
let usersClientsRepository: UsersClientsRepository;
let sut: ListClientsUseCase;

describe('List clients use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		usersClientsRepository = new InMemoryUsersClientsRepository();
		sut = new ListClientsUseCase(usersClientsRepository);
	});

	it('should list all client from a user correctly', async () => {
		const user = await _unit_createUser(usersRepository);

		[...Array(5)].forEach(async () => {
			await _unit_createUserClient(user.id, usersClientsRepository);
		});

		const { clients } = await sut.execute({ userId: user.id });

		expect(clients).toHaveLength(5);
		expect(clients[0].userId).toEqual(user.id);
	});
});
