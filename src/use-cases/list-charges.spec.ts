import { beforeEach, describe, expect, it } from 'vitest';
import { ListChargesUseCase } from './list-charges';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { _unit_createUser } from '@/utils/test/unit/create-user';
import { _unit_createCharge } from '@/utils/test/unit/create-charge';

let usersRepository: UsersRepository;
let chargesRepository: ChargesRepository;
let sut: ListChargesUseCase;

describe('List charges use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		chargesRepository = new InMemoryChargesRepository();
		sut = new ListChargesUseCase(chargesRepository);
	});

	it('should list charges by user id correctly', async () => {
		const user = await _unit_createUser(usersRepository);

		[...Array(5)].forEach(async () => {
			await _unit_createCharge(user.id, chargesRepository, {});
		});

		const { charges } = await sut.execute({
			userId: user.id,
		});

		expect(charges).toHaveLength(5);
		expect(charges[0].userId).toEqual(user.id);
	});
});
