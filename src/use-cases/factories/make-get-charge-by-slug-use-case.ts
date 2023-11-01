import { PrismaChargesRepository } from '@/repositories/prisma/prisma-charges-repository';
import { PrismaCheckoutsRepository } from '@/repositories/prisma/prisma-checkouts-repository';
import { GetChargeBySlugUseCase } from '../get-charge-by-slug';

export function makeGetChargeBySlugUseCase() {
	const checkoutsRepository = new PrismaCheckoutsRepository();
	const chargesRepository = new PrismaChargesRepository();

	const getChargeBySlugUseCase = new GetChargeBySlugUseCase(
		checkoutsRepository,
		chargesRepository,
	);

	return getChargeBySlugUseCase;
}
