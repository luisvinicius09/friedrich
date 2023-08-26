import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { User } from '@prisma/client';

interface RegisterUseCaseRequest {
	email: string;
	name: string;
	password: string;
	document: string,
	phoneNumber: number,
}

interface RegisterUseCaseResponse {
	user: User;
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository) { }

	async execute({ email, name, password, document, phoneNumber }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

		const userWithSameEmail = await this.usersRepository.findByEmail(email);

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError();
		}

		const password_hash = await hash(password, 6);

		const user = await this.usersRepository.create({
			name: name,
			email: email,
			password: password_hash,
			document: document,
			phoneNumber: phoneNumber,
		});

		return { user };
	}

}