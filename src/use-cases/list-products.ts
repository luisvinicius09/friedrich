import { UsersProductsRepository } from '@/repositories/interfaces/users-products-repository';

export class ListProductsUseCase {
	constructor(private productsRepository: UsersProductsRepository) {}

	async execute(userId: string) {
		const products = await this.productsRepository.findAllByUserId(userId);

		return { products };
	}
}
