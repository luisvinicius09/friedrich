import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { CheckoutsRepository } from '@/repositories/interfaces/checkouts-repository';
import { Charge } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetChargeBySlugRequest {
	slug: string;
}

interface GetChargeBySlugResponse {
	charge: Charge;
}

export class GetChargeBySlugUseCase {
	constructor(
		private checkoutsRepository: CheckoutsRepository,
		private chargesRepository: ChargesRepository,
	) {}

	async execute({ slug }: GetChargeBySlugRequest): Promise<GetChargeBySlugResponse> {
		const checkout = await this.checkoutsRepository.findBySlug(slug);

		if (!checkout) {
			throw new ResourceNotFoundError();
		}

		const charge = await this.chargesRepository.findByChargeId(checkout.chargeId);

		if (!charge) {
			throw new ResourceNotFoundError();
		}

		return { charge };
	}
}
