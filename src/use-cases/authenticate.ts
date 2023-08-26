import { UsersRepository } from '@/repositories/interfaces/users-repository';

export class AuthenticateUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute() {
		const user = await this.usersRepository.findByEmail('');

		if (!user) {
			throw new Error('User not found'); // Create error for this
		}

		// validate user password here
    

		return user;
	}
}
