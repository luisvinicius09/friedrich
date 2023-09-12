import { PrismaUsersClientsRepository } from '@/repositories/prisma/prisma-users-clients-repository';
import { CreateClientUseCase } from '../create-client';

export function makeCreateClientUseCase() {
	const usersClientsRepository = new PrismaUsersClientsRepository();
	const createClientUseCase = new CreateClientUseCase(usersClientsRepository);

	return createClientUseCase;
}
