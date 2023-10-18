import { Prisma } from '@prisma/client';
import { UsersClientsAddressesRepository } from '../interfaces/users-clients-addresses-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUsersClientsAddressesRepository
	implements UsersClientsAddressesRepository
{
	async create(data: Prisma.UserClientAddressCreateManyInput) {
		const address = await prisma.userClientAddress.create({
			data: data,
		});

		return address;
	}

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
