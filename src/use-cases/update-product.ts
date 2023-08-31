import { UsersProductsRepository } from '@/repositories/interfaces/users-products-repository';
import { UserProduct } from '@prisma/client';

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
		const product = await this.usersProductsRepository.update(productId, {
			name,
			active,
		});

		return { product };
	}
}
