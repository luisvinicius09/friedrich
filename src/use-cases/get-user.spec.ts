import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserUseCase } from './get-user';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { _unit_createUser } from '@/utils/test/unit/create-user';

let usersRepository: UsersRepository;
let sut: GetUserUseCase;

describe('Get user use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();

		sut = new GetUserUseCase(usersRepository);
	});

	it('should return a user correctly', async () => {
		const userCreated = await _unit_createUser(usersRepository);

		const { user } = await sut.execute({ userId: userCreated.id });

		expect(user.id).toEqual(userCreated.id);
		expect(user.name).toEqual(userCreated.name);
	});
});
