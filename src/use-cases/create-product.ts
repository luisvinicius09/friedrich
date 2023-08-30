import { UsersProductsRepository } from '@/repositories/interfaces/users-products-repository';
import { UserProduct } from '@prisma/client';

interface CreateProductUseCaseRequest {
	userId: string;
	name: string;
	value: number;
	fixedValue: boolean;
	active: boolean;
}

interface CreateProductUseCaseResponse {
	userProduct: UserProduct;
}

export class CreateProductUseCase {
	constructor(private usersProductsRepository: UsersProductsRepository) {
		this.usersProductsRepository = usersProductsRepository;
	}

	async execute({
		userId,
		name,
		value,
		fixedValue,
		active,
	}: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
		const userProduct = await this.usersProductsRepository.create({
			userId,
			name,
			value,
			fixedValue,
			active,
		});

		return { userProduct };
	}
}
