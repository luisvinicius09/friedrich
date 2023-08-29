import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { User } from '@prisma/client';

interface UserUpdateInfoUseCaseRequest {
	userId: string;
	document?: string;
	phoneNumber?: number;
}

interface UserUpdateInfoUseCaseResponse {
	user: User;
}

export class UserUpdateInfoUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		userId,
		document,
		phoneNumber,
	}: UserUpdateInfoUseCaseRequest): Promise<UserUpdateInfoUseCaseResponse> {
		const user = await this.usersRepository.update(userId, {
			document: document,
			phoneNumber: phoneNumber,
		});

		return { user };
	}
}
