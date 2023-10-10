import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserUpdateInfoUseCase } from './user-update-info';
import { _unit_createUser } from '@/utils/test/unit/create-user';

let usersRepository: UsersRepository;
let sut: UserUpdateInfoUseCase;

describe('User update info use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new UserUpdateInfoUseCase(usersRepository);
	});

	it('should update user information correctly', async () => {
		const user = await _unit_createUser(usersRepository);

		const { user: updatedUser } = await sut.execute({
			userId: user.id,
			document: '987654321',
			phoneNumber: 987654321,
		});

		expect(updatedUser.id).toEqual(expect.any(String));
		expect(updatedUser.document).toEqual('987654321');
		expect(updatedUser.phoneNumber).toEqual(987654321);
	});

	it.todo('', () => {});
});
