import { PrismaUsersProductsRepository } from '@/repositories/prisma/prisma-users-products-repository';
import { RemoveProductUseCase } from '../remove-product';

export function makeRemoveProductUseCase() {
	const usersProductsRepository = new PrismaUsersProductsRepository();
	const removeProductUseCase = new RemoveProductUseCase(usersProductsRepository);

	return removeProductUseCase;
}
