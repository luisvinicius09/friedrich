import { CreateChargeUseCase } from '../create-charge';
import { PrismaChargesRepository } from '@/repositories/prisma/prisma-charges-repository';

export function makeCreateChargeUseCase() {
	const chargesRepository = new PrismaChargesRepository();
	const createChargeUseCase = new CreateChargeUseCase(chargesRepository);

	return createChargeUseCase;
}
