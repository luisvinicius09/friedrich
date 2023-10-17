import { Prisma } from '@prisma/client';
import { UsersClientsAddressesRepository } from '../interfaces/users-clients-addresses-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUsersClientsAddressesRepository
	implements UsersClientsAddressesRepository
{
	// async create(data: Prisma.UserClientAddressCreateManyInput) {
	// 	throw new Error('Method not implemented.');
	// }

	async findByClientId(clientId: string) {
		const address = await prisma.userClientAddress.findUnique({
			where: {
				userClientId: clientId,
			},
		});

		return address;
	}

	// async update(clientId: string, data: Prisma.UserClientAddressUpdateInput) {
	// 	throw new Error('Method not implemented.');
	// }
}
