import { beforeEach, describe, expect, it } from 'vitest';
import { CreateCheckoutUseCase } from './create-checkout';
import { CheckoutsRepository } from '@/repositories/interfaces/checkouts-repository';
import { InMemoryCheckoutsRepository } from '@/repositories/in-memory/in-memory-checkouts-repository';
import { _unit_createUser } from '@/utils/test/unit/create-user';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { _unit_createCharge } from '@/utils/test/unit/create-charge';
import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: UsersRepository;
let chargesRepository: ChargesRepository;
let checkoutsRepository: CheckoutsRepository;
let sut: CreateCheckoutUseCase;

describe('Create checkout use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		chargesRepository = new InMemoryChargesRepository();
		checkoutsRepository = new InMemoryCheckoutsRepository();
		sut = new CreateCheckoutUseCase(checkoutsRepository);
	});

	it('should create a checkout correctly', async () => {
		const user = await _unit_createUser(usersRepository);

		const charge = await _unit_createCharge(user.id, chargesRepository, {});

		const { checkout } = await sut.execute({
			userId: user.id,
			chargeId: charge.id,
		});

		expect(checkout.id).toEqual(expect.any(String));
		expect(checkout.userId).toEqual(user.id);
	});
});
