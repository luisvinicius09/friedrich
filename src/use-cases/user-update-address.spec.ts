import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { beforeAll, describe, it } from 'vitest';

let usersRepository: UsersRepository;
let sut: UserUpdateAddressUseCase;

describe('User update address use case', () => {
	beforeAll(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new UserUpdateAddressUseCase(usersRepository);
	});

	it.todo('should correctly update the user address', async () => {});

	it.todo('', () => {});
});
