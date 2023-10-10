import { UsersAddressesRepository } from '@/repositories/interfaces/users-addresses-repository';
import { UserAddress } from '@prisma/client';

interface UserFillAddressUseCaseRequest {
	street: string;
	number: string;
	complement: string | null;
	userId: string;
	city: string;
	district: string;
	stateCode: string;
	zipCode: string;
}

interface UserFillAddressUseCaseResponse {
	userAddress: UserAddress;
}

export class UserFillAddressUseCase {
	constructor(private usersAddressesRepository: UsersAddressesRepository) {}

	async execute({
		street,
		number,
		city,
		district,
		stateCode,
		zipCode,
		complement,
		userId,
	}: UserFillAddressUseCaseRequest): Promise<UserFillAddressUseCaseResponse> {
		const userAddress = await this.usersAddressesRepository.create({
			street,
			number,
			city,
			district,
			stateCode,
			zipCode,
			complement,
			userId,
		});

		return { userAddress };
	}
}
