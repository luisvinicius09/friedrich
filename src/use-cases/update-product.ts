import { UsersProductsRepository } from '@/repositories/interfaces/users-products-repository';
import { UserProduct } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface UpdateProductUseCaseRequest {
	active?: boolean;
	name?: string;
	productId: string;
	fixedValue?: boolean;
	value?: number;
}

interface UpdateProductUseCaseResponse {
	product: UserProduct;
}

export class UpdateProductUseCase {
	constructor(private usersProductsRepository: UsersProductsRepository) {}

	async execute({
		productId,
		name,
		active,
	}: UpdateProductUseCaseRequest): Promise<UpdateProductUseCaseResponse> {
		const productExists = await this.usersProductsRepository.findByProductId(productId);

		if (!productExists) {
			throw new ResourceNotFoundError();
		}

		const product = await this.usersProductsRepository.update(productId, {
			name,
			active,
		});

		return { product };
	}
}
