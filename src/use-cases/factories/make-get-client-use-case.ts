import { PrismaUsersClientsRepository } from '@/repositories/prisma/prisma-users-clients-repository';
import { GetClientUseCase } from '../get-client';

export function makeGetClientUseCase() {
	const userClientsRepository = new PrismaUsersClientsRepository();

	const getClientsUseCase = new GetClientUseCase(userClientsRepository);

	return getClientsUseCase;
}
