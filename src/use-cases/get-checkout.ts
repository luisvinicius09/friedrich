import { CheckoutsRepository } from '@/repositories/interfaces/checkouts-repository';
import { Checkout } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetCheckoutUseCaseRequest {
	slug?: string;
	checkoutId?: string;
}

interface GetCheckoutUseCaseResponse {
	checkout: Checkout;
}

export class GetCheckoutUseCase {
	constructor(private checkoutsRepository: CheckoutsRepository) {}

	async execute({
		checkoutId,
		slug,
	}: GetCheckoutUseCaseRequest): Promise<GetCheckoutUseCaseResponse> {
		let checkout: Checkout | null = null;

		if (checkoutId) {
			checkout = await this.checkoutsRepository.findByCheckoutId(checkoutId);
		}

		if (slug) {
			checkout = await this.checkoutsRepository.findBySlug(slug);
		}

		if (!checkout) {
			throw new ResourceNotFoundError();
		}

		return { checkout };
	}
}
