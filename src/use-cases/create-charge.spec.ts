import { describe, it, beforeEach, expect } from 'vitest';
import { CreateChargeUseCase } from './create-charge';
import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { InMemoryUsersClientsRepository } from '@/repositories/in-memory/in-memory-users-clients-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { _unit_createUser } from '@/utils/test/unit/create-user';
import { _unit_createUserClient } from '@/utils/test/unit/create-user-client';

let usersRepository: UsersRepository;
let usersClientsRepository: UsersClientsRepository;
let chargeRepository: ChargesRepository;
let sut: CreateChargeUseCase;

describe('Create charge use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		usersClientsRepository = new InMemoryUsersClientsRepository();
		chargeRepository = new InMemoryChargesRepository();
		sut = new CreateChargeUseCase(chargeRepository);
	});

	it('should create a charge correctly', async () => {
		const user = await _unit_createUser(usersRepository);

		const userClient = await _unit_createUserClient(user.id, usersClientsRepository);

		const { charge } = await sut.execute({
			userClientId: userClient.id,
			userId: user.id,
			userProductId: null,
 			amountInCents: 1324,
			expireDate: new Date(),
			selectedPaymentTypes: ['CREDIT_CARD', 'BOLETO'],
		});

		expect(charge.id).toEqual(expect.any(String));
		expect(charge.statusId).toEqual(1);
	});
});
