import { PrismaCheckoutsRepository } from '@/repositories/prisma/prisma-checkouts-repository';
import { UpdateCheckoutUseCase } from '../update-checkout';

export function makeUpdateCheckoutUseCase() {
	const checkoutsRepository = new PrismaCheckoutsRepository();
	const updateCheckoutUseCase = new UpdateCheckoutUseCase(checkoutsRepository);

	return updateCheckoutUseCase;
}
