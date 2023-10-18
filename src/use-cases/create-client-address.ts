import { UsersClientsAddressesRepository } from '@/repositories/interfaces/users-clients-addresses-repository';
import { UserClientAddress } from '@prisma/client';

interface CreateClientAddressUseCaseRequest {
	clientId: string;
	district: string;
	stateCode: string;
	zipCode: string;
	street: string;
	number: string;
	complement: string;
	city: string;
}

interface CreateClientAddressUseCaseResponse {
	clientAddress: UserClientAddress;
}

export class CreateClientAddressUseCase {
	constructor(private clientsAddressesRepository: UsersClientsAddressesRepository) {}

	async execute({
		clientId,
		district,
		stateCode,
		zipCode,
		street,
		number,
		complement,
		city,
	}: CreateClientAddressUseCaseRequest): Promise<CreateClientAddressUseCaseResponse> {
		const clientAddress = await this.clientsAddressesRepository.create({
			userClientId: clientId,
			district,
			stateCode,
			zipCode,
			street,
			number,
			complement,
			city,
		});

		return { clientAddress };
	}
}
