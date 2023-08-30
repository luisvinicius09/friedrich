import { Prisma } from '@prisma/client';
import { UsersProductsRepository } from '../interfaces/users-products-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUsersProductsRepository implements UsersProductsRepository {
	async create(data: Prisma.UserProductUncheckedCreateInput) {
		const userProduct = await prisma.userProduct.create({
			data: data,
		});

		return userProduct;
	}

	async findAllByUserId(userId: string) {
		const userProducts = await prisma.userProduct.findMany({
			where: {
				userId: userId,
			},
		});

		return userProducts;
	}

	async findByProductId(productId: string) {
		const userProduct = await prisma.userProduct.findUnique({
			where: {
				id: productId,
			},
		});

		return userProduct;
	}

	async update(productId: string, data: Prisma.UserProductUpdateInput) {
		const userProduct = await prisma.userProduct.update({
			where: {
				id: productId,
			},
			data: data,
		});

		return userProduct;
	}

	async delete(productId: string): Promise<void> {
		await prisma.userProduct.delete({
			where: {
				id: productId,
			},
		});
	}
}
