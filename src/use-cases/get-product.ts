import { UserProduct } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UsersProductsRepository } from '@/repositories/interfaces/users-products-repository';

interface GetProductUseCaseRequest {
	productId: string;
}

interface GetProductUseCaseResponse {
	product: UserProduct;
}

export class GetProductUseCase {
	constructor(private usersProductsRepository: UsersProductsRepository) {}

	async execute({
		productId,
	}: GetProductUseCaseRequest): Promise<GetProductUseCaseResponse> {
		const product = await this.usersProductsRepository.findByProductId(productId);

		if (!product) {
			throw new ResourceNotFoundError();
		}

		return { product };
	}
}
