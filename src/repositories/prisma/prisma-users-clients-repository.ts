import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { UsersClientsRepository } from '../interfaces/users-clients-repository';

export class PrismaUsersClientsRepository implements UsersClientsRepository {
	async create(data: Prisma.UserClientUncheckedCreateInput) {
		const userClient = await prisma.userClient.create({
			data: data,
		});

		return userClient;
	}

	async findAllByUserId(userId: string) {
		const userClients = await prisma.userClient.findMany({
			where: {
				userId: userId,
			},
		});

		return userClients;
	}

	async findByClientId(clientId: string) {
		const userClient = await prisma.userClient.findUnique({
			where: {
				id: clientId,
			},
		});

		return userClient;
	}

	async update(clientId: string, data: Prisma.UserClientUpdateInput) {
		const userClient = await prisma.userClient.update({
			where: {
				id: clientId,
			},
			data: data,
		});

		return userClient;
	}
}
