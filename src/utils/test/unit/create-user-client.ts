import { UsersClientsRepository } from '@/repositories/interfaces/users-clients-repository';
import { UserClient } from '@prisma/client';

export async function _unit_createUserClient(
	userId: string,
	usersClientsRepository: UsersClientsRepository,
): Promise<UserClient> {
	const userClient = await usersClientsRepository.create({
		document: '123456789',
		documentType: 'CPF',
		name: 'John Doe',
		phoneNumber: 123456789,
		userId: userId,
		email: 'john@email.com',
	});

	return userClient;
}
