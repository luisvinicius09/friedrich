import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { User } from '@prisma/client';

interface RegisterUseCaseRequest {
	email: string;
	name: string;
	password: string;
}

interface RegisterUseCaseResponse {
	user: User;
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository) { }

	async execute({ email, name, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

		const userWithSameEmail = await this.usersRepository.findUserByEmail(email);

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError();
		}

		const password_hash = await hash(password, 6);

		const user = await this.usersRepository.create({
			name: name,
			email: email,
			password: password_hash,
		});

		return { user };
	}

}