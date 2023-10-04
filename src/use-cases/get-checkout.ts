import { CheckoutsRepository } from '@/repositories/interfaces/checkouts-repository';
import { Checkout } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetCheckoutUseCaseRequest {
	checkoutId: string;
}

interface GetCheckoutUseCaseResponse {
	checkout: Checkout;
}

export class GetCheckoutUseCase {
	constructor(private checkoutsRepository: CheckoutsRepository) {}

	async execute({
		checkoutId,
	}: GetCheckoutUseCaseRequest): Promise<GetCheckoutUseCaseResponse> {
		const checkout = await this.checkoutsRepository.findByCheckoutId(checkoutId);

		if (!checkout) {
			throw new ResourceNotFoundError();
		}

		return { checkout };
	}
}
