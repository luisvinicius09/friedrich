import { UsersAddressesRepository } from '@/repositories/interfaces/users-addresses-repository';
import { UserAddress } from '@prisma/client';

interface UserFillAddressUseCaseRequest {
	street: string;
	number: string;
	neighborhood: string;
	complement: string | null;
	userId: string;
}

interface UserFillAddressUseCaseResponse {
	userAddress: UserAddress;
}

export class UserFillAddressUseCase {
	constructor(private usersAddressesRepository: UsersAddressesRepository) {}

	async execute({
		street,
		number,
		neighborhood,
		complement,
		userId,
	}: UserFillAddressUseCaseRequest): Promise<UserFillAddressUseCaseResponse> {
		const userAddress = await this.usersAddressesRepository.create({
			street,
			number,
			neighborhood,
			complement,
			userId,
		});

		return { userAddress };
	}
}
