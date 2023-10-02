import { PrismaCheckoutsRepository } from '@/repositories/prisma/prisma-checkouts-repository';
import { CreateCheckoutUseCase } from '../create-checkout';

export function makeCreateCheckoutUseCase() {
	const checkoutsRepository = new PrismaCheckoutsRepository();
	const createCheckoutUseCase = new CreateCheckoutUseCase(checkoutsRepository);

	return createCheckoutUseCase;
}
