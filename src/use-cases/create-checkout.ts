import { CheckoutsRepository } from '@/repositories/interfaces/checkouts-repository';
import { Checkout } from '@prisma/client';

interface CreateCheckoutUseCaseRequest {
	userId: string;
	chargeId: string;
}

interface CreateCheckoutUseCaseResponse {
	checkout: Checkout;
}

export class CreateCheckoutUseCase {
	constructor(private checkoutsRepository: CheckoutsRepository) {}

	async execute({
		userId,
		chargeId,
	}: CreateCheckoutUseCaseRequest): Promise<CreateCheckoutUseCaseResponse> {
		const checkout = await this.checkoutsRepository.create({
			userId,
			chargeId,
		});

		return { checkout };
	}
}
