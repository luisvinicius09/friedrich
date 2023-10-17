import { GetClientAddressUseCase } from '../get-client-address';
import { PrismaUsersClientsAddressesRepository } from '@/repositories/prisma/prisma-users-clients-addresses-repository';

export function makeGetClientAddressUseCase() {
	const usersClientsAddressesRepository = new PrismaUsersClientsAddressesRepository();
	const getClientAddressUseCase = new GetClientAddressUseCase(
		usersClientsAddressesRepository,
	);

	return getClientAddressUseCase;
}
