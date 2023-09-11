import { PrismaUsersProductsRepository } from '@/repositories/prisma/prisma-users-products-repository';
import { CreateProductUseCase } from '../create-product';

export function makeCreateProductUseCase() {
	const usersProductsRepository = new PrismaUsersProductsRepository();
	const createProductUseCase = new CreateProductUseCase(usersProductsRepository);

	return createProductUseCase;
}
