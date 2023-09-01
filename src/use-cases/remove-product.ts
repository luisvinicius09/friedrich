import { UsersProductsRepository } from '@/repositories/interfaces/users-products-repository';

interface RemoveProductUseCaseRequest {
	productId: string;
}

export class RemoveProductUseCase {
	constructor(private usersProductsRepository: UsersProductsRepository) {}

	async execute({ productId }: RemoveProductUseCaseRequest): Promise<void> {
		await this.usersProductsRepository.delete(productId);
	}
}
