import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { Charge } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetChargeUseCaseRequest {
	chargeId: string;
}

interface GetChargeUseCaseResponse {
	charge: Charge;
}

export class GetChargeUseCase {
	constructor(private chargesRepository: ChargesRepository) {}

	async execute({
		chargeId,
	}: GetChargeUseCaseRequest): Promise<GetChargeUseCaseResponse> {
		const charge = await this.chargesRepository.findByChargeId(chargeId);

		if (!charge) {
			throw new ResourceNotFoundError();
		}

		return { charge };
	}
}
