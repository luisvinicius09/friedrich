import { CheckoutsRepository } from '@/repositories/interfaces/checkouts-repository';
import { Checkout, Prisma } from '@prisma/client';

interface UpdateCheckoutUseCaseRequest {
	checkoutId: string;
	data: Prisma.CheckoutUncheckedUpdateInput;
}

interface UpdateCheckoutUseCaseResponse {
	checkout: Checkout;
}

export class UpdateCheckoutUseCase {
	constructor(private checkoutsRepository: CheckoutsRepository) {}

	async execute({
		checkoutId,
		data,
	}: UpdateCheckoutUseCaseRequest): Promise<UpdateCheckoutUseCaseResponse> {
		const checkout = await this.checkoutsRepository.update(checkoutId, data);

		return { checkout };
	}
}
