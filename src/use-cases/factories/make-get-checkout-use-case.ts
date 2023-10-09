import { PrismaCheckoutsRepository } from '@/repositories/prisma/prisma-checkouts-repository';
import { GetCheckoutUseCase } from '../get-checkout';

export function makeGetCheckoutUseCase() {
	const checkoutsRepository = new PrismaCheckoutsRepository();

	const getCheckoutUseCase = new GetCheckoutUseCase(checkoutsRepository);

	return getCheckoutUseCase;
}
