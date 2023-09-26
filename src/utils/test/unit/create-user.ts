import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { User } from '@prisma/client';

export async function createUser(usersRepository: UsersRepository): Promise<User> {
	const user = await usersRepository.create({
		document: '123456789',
		email: 'john-doe@email.com',
		name: 'John Doe',
		password: 'john-doe-pw',
		phoneNumber: 123456789,
	});

	return user;
}
