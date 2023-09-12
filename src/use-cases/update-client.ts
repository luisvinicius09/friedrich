import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { UserClient } from '@prisma/client';

interface UpdateClientUseCaseRequest {
	clientId: string;
	name: string;
	document: string;
	phoneNumber: number;
	email: string;
}

interface UpdateClientUseCaseResponse {
	userClient: UserClient;
}

export class UpdateClientUseCase {
	constructor(private usersClientsRepository: UsersClientsRepository) {}

	async execute({
		clientId,
		name,
		document,
		phoneNumber,
		email,
	}: UpdateClientUseCaseRequest): Promise<UpdateClientUseCaseResponse> {
		const client = await this.usersClientsRepository.findByClientId(clientId);

		if (!client) {
			throw new Error('Client not found');
		}

		const userClient = await this.usersClientsRepository.update(clientId, {
			name: name,
			document: document,
			phoneNumber: phoneNumber,
			email: email,
		});

		return { userClient };
	}
}
