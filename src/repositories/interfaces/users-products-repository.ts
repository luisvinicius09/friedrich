import { Prisma, UserProduct } from '@prisma/client';

export interface UsersProductsRepository {
	create(data: Prisma.UserProductUncheckedCreateInput): Promise<UserProduct>;

	findAllByUserId(userId: string): Promise<UserProduct[]>;

	findByProductId(productId: string): Promise<UserProduct | null>;

	update(productId: string, data: Prisma.UserProductUpdateInput): Promise<UserProduct>;

	delete(productId: string): Promise<void>;
}
