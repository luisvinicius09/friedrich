import { PrismaUsersClientsRepository } from '@/repositories/prisma/prisma-users-clients-repository';
import { ListClientsUseCase } from '../list-clients';

export function makeListClientsUseCase() {
	const userClientsRepository = new PrismaUsersClientsRepository();

	const listClientsUseCase = new ListClientsUseCase(userClientsRepository);

	return listClientsUseCase;
}
