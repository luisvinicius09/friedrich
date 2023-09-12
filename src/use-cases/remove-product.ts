import { UsersProductsRepository } from '@/repositories/interfaces/users-products-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface RemoveProductUseCaseRequest {
	productId: string;
}

export class RemoveProductUseCase {
	constructor(private usersProductsRepository: UsersProductsRepository) {}

	async execute({ productId }: RemoveProductUseCaseRequest): Promise<void> {
		const product = await this.usersProductsRepository.findByProductId(productId);

		if (!product) {
			throw new ResourceNotFoundError();
		}

		await this.usersProductsRepository.delete(productId);
	}
}
