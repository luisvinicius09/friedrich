import { beforeEach, describe, expect, it } from 'vitest';
import { GetChargeUseCase } from './get-charge';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryUsersClientsRepository } from '@/repositories/in-memory/in-memory-users-clients-repository';
import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { _unit_createUser } from '@/utils/test/unit/create-user';
import { _unit_createUserClient } from '@/utils/test/unit/create-user-client';
import { ChargeStatus } from '@prisma/client';

let usersRepository: UsersRepository;
let usersClientsRepository: UsersClientsRepository;
let chargesRepository: ChargesRepository;
let sut: GetChargeUseCase;

describe('Get charge use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		usersClientsRepository = new InMemoryUsersClientsRepository();
		chargesRepository = new InMemoryChargesRepository();
		sut = new GetChargeUseCase(chargesRepository);
	});

	it('should retrive a charge correctly', async () => {
		const user = await _unit_createUser(usersRepository);

		const userClient = await _unit_createUserClient(user.id, usersClientsRepository);

		const chargeCreated = await chargesRepository.create({
			userId: user.id,
			userClientId: userClient.id,
			userProductId: null,
			checkoutId: null,
		});

		const { charge } = await sut.execute({ chargeId: chargeCreated.id });

		expect(charge.id).toEqual(expect.any(String));
		expect(charge.status).toEqual(ChargeStatus.PENDING);
	});
});
