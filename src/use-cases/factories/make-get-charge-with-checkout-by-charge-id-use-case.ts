import { PrismaChargesRepository } from '@/repositories/prisma/prisma-charges-repository';
import { PrismaCheckoutsRepository } from '@/repositories/prisma/prisma-checkouts-repository';
import { GetChargeWithCheckoutByChargeIdUseCase } from '../get-charge-with-checkout-by-charge-id';

export function makeGetChargeWithCheckoutByChargeIdUseCase() {
	const chargesRepository = new PrismaChargesRepository();
	const checkoutsRepository = new PrismaCheckoutsRepository();

	const getChargeWithCheckoutByChargeId = new GetChargeWithCheckoutByChargeIdUseCase(
		chargesRepository,
		checkoutsRepository,
	);

	return getChargeWithCheckoutByChargeId;
}
