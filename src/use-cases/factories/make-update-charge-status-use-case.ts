import { PrismaChargesRepository } from '@/repositories/prisma/prisma-charges-repository';
import { UpdateChargeStatusUseCase } from '../update-charge-status';

export function makeUpdateChargeStatusUseCase() {
	const chargesRepository = new PrismaChargesRepository();

	const updateChargeStatusUseCase = new UpdateChargeStatusUseCase(chargesRepository);

	return updateChargeStatusUseCase;
}
