import { PrismaUsersProductsRepository } from '@/repositories/prisma/prisma-users-products-repository';
import { ListProductsUseCase } from '../list-products';

export function makeListProductsUseCase() {
	const productsRepository = new PrismaUsersProductsRepository();

	const listProductsUseCase = new ListProductsUseCase(productsRepository);

	return listProductsUseCase;
}
