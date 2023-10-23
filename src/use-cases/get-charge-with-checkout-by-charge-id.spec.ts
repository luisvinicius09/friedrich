import { beforeEach, describe, expect, it } from 'vitest';
import { GetChargeWithCheckoutByChargeIdUseCase } from './get-charge-with-checkout-by-charge-id';
import { _unit_createCharge } from '@/utils/test/unit/create-charge';
import { _unit_createUser } from '@/utils/test/unit/create-user';
import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { CheckoutsRepository } from '@/repositories/interfaces/checkouts-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { InMemoryCheckoutsRepository } from '@/repositories/in-memory/in-memory-checkouts-repository';

let usersRepository: UsersRepository;
let chargesRepository: ChargesRepository;
let checkoutsRepository: CheckoutsRepository;

let sut: GetChargeWithCheckoutByChargeIdUseCase;

describe('Get charge with checkout by charge id', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		chargesRepository = new InMemoryChargesRepository();
		checkoutsRepository = new InMemoryCheckoutsRepository();
		sut = new GetChargeWithCheckoutByChargeIdUseCase(
			chargesRepository,
			checkoutsRepository,
		);
	});

	it('should get a charge with checkout information by charge id correcty', async () => {
		const user = await _unit_createUser(usersRepository);

		const chargeCreated = await _unit_createCharge(user.id, chargesRepository, {});

		await checkoutsRepository.create({
			chargeId: chargeCreated.id,
			userId: user.id,
		});

		const { charge, checkout } = await sut.execute({ chargeId: chargeCreated.id });

		expect(charge.id).toBe(chargeCreated.id);
		expect(checkout.chargeId).toBe(chargeCreated.id);
	});
});
