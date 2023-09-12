import { PrismaUsersProductsRepository } from '@/repositories/prisma/prisma-users-products-repository';
import { UpdateProductUseCase } from '../update-product';

export function makeUpdateProductUseCase() {
	const usersProductsRepository = new PrismaUsersProductsRepository();
	const updateProductUseCase = new UpdateProductUseCase(usersProductsRepository);

	return updateProductUseCase;
}
