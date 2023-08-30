import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { UserClient } from '@prisma/client';

interface CreateClientUseCaseRequest {
	userId: string;
	name: string;
	document: string;
	phoneNumber: number;
}

interface CreateClientUseCaseResponse {
	userClient: UserClient;
}

export class CreateClientUseCase {
	constructor(private usersClientsRepository: UsersClientsRepository) {}

	async execute({
		userId,
		name,
		document,
		phoneNumber,
	}: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
		const userClient = await this.usersClientsRepository.create({
			userId: userId,
			name: name,
			document: document,
			phoneNumber: phoneNumber,
		});

		return { userClient };
	}
}
