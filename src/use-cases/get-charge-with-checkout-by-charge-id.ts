import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { CheckoutsRepository } from '@/repositories/interfaces/checkouts-repository';
import { Charge, Checkout } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetChargeWithCheckoutByChargeIdUseCaseRequest {
	chargeId: string;
}

interface GetChargeWithCheckoutByChargeIdUseCaseResponse {
	charge: Charge;
	checkout: Checkout;
}

export class GetChargeWithCheckoutByChargeIdUseCase {
	constructor(
		private chargesRepository: ChargesRepository,
		private checkoutsRepository: CheckoutsRepository,
	) {}

	async execute({
		chargeId,
	}: GetChargeWithCheckoutByChargeIdUseCaseRequest): Promise<GetChargeWithCheckoutByChargeIdUseCaseResponse> {
		const charge = await this.chargesRepository.findByChargeId(chargeId);

		if (!charge) {
			throw new ResourceNotFoundError();
		}

		const checkout = await this.checkoutsRepository.findByChargeId(chargeId);

		if (!checkout) {
			throw new ResourceNotFoundError();
		}

		return { charge, checkout };
	}
}
