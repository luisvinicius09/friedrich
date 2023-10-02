import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { UserClient } from '@prisma/client';

interface ListClientsUseCaseRequest {
	userId: string;
}

interface ListClientsUseCaseResponse {
	clients: UserClient[];
}

export class ListClientsUseCase {
	constructor(private readonly clientsRepository: UsersClientsRepository) {}

	async execute({
		userId,
	}: ListClientsUseCaseRequest): Promise<ListClientsUseCaseResponse> {
		const clients = await this.clientsRepository.findAllByUserId(userId);

		return { clients };
	}
}
