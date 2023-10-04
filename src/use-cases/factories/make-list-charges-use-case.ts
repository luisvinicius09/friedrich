import { PrismaChargesRepository } from '@/repositories/prisma/prisma-charges-repository';
import { ListChargesUseCase } from '../list-charges';

export function makeListChargesUseCase() {
	const chargesRepository = new PrismaChargesRepository();

	const listChargesUseCase = new ListChargesUseCase(chargesRepository);

	return listChargesUseCase;
}
