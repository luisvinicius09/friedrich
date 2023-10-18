import { PrismaUsersClientsAddressesRepository } from '@/repositories/prisma/prisma-users-clients-addresses-repository';
import { CreateClientAddressUseCase } from '../create-client-address';

export function makeCreateClientAddressUseCase() {
	const clientsAddressesRepository = new PrismaUsersClientsAddressesRepository();
	const createClientAddress = new CreateClientAddressUseCase(clientsAddressesRepository);

	return createClientAddress;
}
