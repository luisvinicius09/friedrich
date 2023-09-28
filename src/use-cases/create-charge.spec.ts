import { describe, it, beforeEach, expect } from 'vitest';
import { CreateChargeUseCase } from './create-charge';
import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { InMemoryUsersClientsRepository } from '@/repositories/in-memory/in-memory-users-clients-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { ChargeStatus } from '@prisma/client';

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
		const user = await usersRepository.create({
			document: '123456789',
			email: 'john-doe@email.com',
			name: 'John Doe',
			password: 'john-doe-pw',
			phoneNumber: 123456789,
		});

		const userClient = await usersClientsRepository.create({
			document: '123456789',
			name: 'John Doe',
			phoneNumber: 123456789,
			userId: user.id,
			email: 'john@email.com',
		});

		const { charge } = await sut.execute({
			userClientId: userClient.id,
			userId: user.id,
			userProductId: null,
			checkoutId: null,
		});

		expect(charge.id).toEqual(expect.any(String));
		expect(charge.status).toEqual(ChargeStatus.PENDING);
	});
});
