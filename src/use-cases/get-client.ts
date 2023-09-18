import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { UserClient } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetClientUseCaseRequest {
	clientId: string;
}

interface GetClientUseCaseResponse {
	client: UserClient;
}

export class GetClientUseCase {
	constructor(private usersClientsRepository: UsersClientsRepository) {}

	async execute({
		clientId,
	}: GetClientUseCaseRequest): Promise<GetClientUseCaseResponse> {
		const client = await this.usersClientsRepository.findByClientId(clientId);

		if (!client) {
			throw new ResourceNotFoundError();
		}

		return { client };
	}
}
