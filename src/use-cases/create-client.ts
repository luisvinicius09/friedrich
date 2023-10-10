import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { UserClient } from '@prisma/client';

interface CreateClientUseCaseRequest {
	userId: string;
	name: string;
	document: string;
	documentType: 'CPF' | 'CNPJ';
	phoneNumber: number;
	email: string;
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
		documentType,
		phoneNumber,
		email,
	}: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
		const userClient = await this.usersClientsRepository.create({
			userId: userId,
			name: name,
			document: document,
			documentType: documentType,
			phoneNumber: phoneNumber,
			email,
		});

		return { userClient };
	}
}
