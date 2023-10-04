import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { InMemoryCheckoutsRepository } from '@/repositories/in-memory/in-memory-checkouts-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { CheckoutsRepository } from '@/repositories/interfaces/checkouts-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { _unit_createCharge } from '@/utils/test/unit/create-charge';
import { _unit_createUser } from '@/utils/test/unit/create-user';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetCheckoutUseCase } from './get-checkout';

let usersRepository: UsersRepository;
let checkoutsRepository: CheckoutsRepository;
let chargesRepository: ChargesRepository;
let sut: GetCheckoutUseCase;

describe('Get checkout use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		checkoutsRepository = new InMemoryCheckoutsRepository();
		chargesRepository = new InMemoryChargesRepository();
		sut = new GetCheckoutUseCase(checkoutsRepository);
	});

	it('should get a specific checkout correctly', async () => {
		const user = await _unit_createUser(usersRepository);
		const charge = await _unit_createCharge(user.id, chargesRepository, {});

		const checkoutCreated = await checkoutsRepository.create({
			chargeId: charge.id,
			userId: user.id,
		});

		const { checkout } = await sut.execute({
			checkoutId: checkoutCreated.id,
		});

		expect(checkout.id).toEqual(checkoutCreated.id);
	});
});
