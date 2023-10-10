import { Prisma, UserProduct } from '@prisma/client';
import { UsersProductsRepository } from '../interfaces/users-products-repository';
import { z } from 'zod';
import { randomUUID } from 'crypto';

export class InMemoryUsersProductsRepository implements UsersProductsRepository {
	public usersProducts: UserProduct[] = [];

	private userProductSchema = z.object({
		name: z.string(),
		value: z.number(),
		fixedValue: z.boolean(),
		active: z.boolean(),
		userId: z.string(),
	});
	async create(data: Prisma.UserProductUncheckedCreateInput) {

		const { active, fixedValue, name, value, userId } = this.userProductSchema.parse(data);

		const userProduct = {
			id: randomUUID(),
			active,
			fixedValue,
			name: name,
			userId: userId,
			value: value,
			createdAt: new Date(),
			updatedAt: new Date(),
		} as UserProduct;

		this.usersProducts.push(userProduct);

		return userProduct;
	}

	async findAllByUserId(userId: string) {
		return this.usersProducts.filter((userProduct) => userProduct.userId === userId);
	}

	async findByProductId(productId: string) {
		return this.usersProducts.find((userProduct) => userProduct.id === productId) || null;
	}

	async update(productId: string, data: Prisma.UserProductUpdateInput) {
		const userProductIndex = this.usersProducts.findIndex(
			(userProduct) => userProduct.id === productId,
		);

		this.usersProducts = this.usersProducts.map((item) => {
			if (item.id === productId) {
				return { ...item, ...data };
			}
		}) as UserProduct[];

		return { ...this.usersProducts[userProductIndex], ...data } as UserProduct;
	}

	async delete(productId: string): Promise<void> {
		const userProductIndex = this.usersProducts.findIndex(
			(userProduct) => userProduct.id === productId,
		);

		this.usersProducts.splice(userProductIndex, 1);
	}
}
