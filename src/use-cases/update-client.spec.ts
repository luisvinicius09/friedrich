import { InMemoryUsersClientsRepository } from '@/repositories/in-memory/in-memory-users-clients-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { UpdateClientUseCase } from './update-client';

let usersRepository: UsersRepository;
let clientsRepository: UsersClientsRepository;
let sut: UpdateClientUseCase;

describe('Update client use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		clientsRepository = new InMemoryUsersClientsRepository();
		sut = new UpdateClientUseCase(clientsRepository);
	});

	it('should update client correctly', async () => {
		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'joe-doe@email.com',
			document: '123456789',
			password: 'joe-doe-pw',
			phoneNumber: 123456789,
		});

		const clientCreated = await clientsRepository.create({
			document: '123456789',
			name: 'John Doe',
			phoneNumber: 123456789,
			userId: user.id,
			email: 'john@email.com',
		});

		expect(clientCreated.name).toEqual('John Doe');
		expect(clientCreated.phoneNumber).toEqual(123456789);
		expect(clientCreated.document).toEqual('123456789');

		const { userClient: client } = await sut.execute({
			document: '132345',
			name: 'John Doe 2',
			phoneNumber: 12345,
			clientId: clientCreated.id,
			email: 'john@doe2.com',
		});

		expect(client.id).toEqual(expect.any(String));
		expect(client.name).toEqual('John Doe 2');
		expect(client.phoneNumber).toEqual(12345);
		expect(client.document).toEqual('132345');
	});
});
