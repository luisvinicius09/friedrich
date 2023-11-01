import { PrismaChargesRepository } from '@/repositories/prisma/prisma-charges-repository';
import { UpdateChargeUseCase } from '../update-charge';

export function makeUpdateChargeUseCase() {
	const chargesRepository = new PrismaChargesRepository();

	const updateChargeUseCase = new UpdateChargeUseCase(chargesRepository);

	return updateChargeUseCase;
}
