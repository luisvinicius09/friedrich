import { Prisma } from '@prisma/client';
import { UsersAddressesRepository } from '../interfaces/users-addresses-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUsersAddressesRepository implements UsersAddressesRepository {
	async create(data: Prisma.UserAddressUncheckedCreateInput) {
		const userAddress = await prisma.userAddress.create({
			data,
		});

		return userAddress;
	}

	async findByUserId(userId: string) {
		const userAddress = await prisma.userAddress.findUnique({
			where: {
				userId,
			},
		});

		return userAddress;
	}

	async update(userId: string, data: Prisma.UserAddressUpdateWithoutUserInput) {
		const userAddress = await prisma.userAddress.update({
			where: {
				userId: userId,
			},
			data: data,
		});

		return userAddress;
	}
}
