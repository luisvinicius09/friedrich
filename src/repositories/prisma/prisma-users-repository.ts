import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { UsersRepository } from '@/repositories/interfaces/users-repository';

export class PrismaUsersRepository implements UsersRepository {
	async create(data: Prisma.UserCreateManyInput) {
		const user = await prisma.user.create({
			data: data,
		});

		return user;
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		return user;
	}

	async findByUserId(userId: string) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		return user;
	}

	async update(userId: string, data: Prisma.UserUncheckedUpdateManyInput) {
		const user = await prisma.user.update({
			where: {
				id: userId,
			},
			data: data,
		});

		return user;
	}
}
