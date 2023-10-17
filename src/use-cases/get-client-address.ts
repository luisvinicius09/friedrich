import { UsersClientsAddressesRepository } from '@/repositories/interfaces/users-clients-addresses-repository';
import { UserClientAddress } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetClientAddressUseCaseRequest {
	clientId: string;
}

interface GetClientAddressUseCaseResponse {
	clientAddress: UserClientAddress;
}

export class GetClientAddressUseCase {
	constructor(private clientsAddressesRepository: UsersClientsAddressesRepository) {}

	async execute({
		clientId,
	}: GetClientAddressUseCaseRequest): Promise<GetClientAddressUseCaseResponse> {
		const clientAddress = await this.clientsAddressesRepository.findByClientId(clientId);

		if (!clientAddress) {
			throw new ResourceNotFoundError();
		}

		return { clientAddress };
	}
}
