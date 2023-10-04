import { PrismaChargesRepository } from '@/repositories/prisma/prisma-charges-repository';
import { GetChargeUseCase } from '../get-charge';

export function makeGetChargeUseCase() {
	const chargesRepository = new PrismaChargesRepository();

	const getChargeUseCase = new GetChargeUseCase(chargesRepository);

	return getChargeUseCase;
}
