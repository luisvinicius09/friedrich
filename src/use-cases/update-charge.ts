import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { Charge, Prisma } from '@prisma/client';

interface UpdateChargeUseCaseRequest {
	chargeId: string;
	data: Prisma.ChargeUncheckedUpdateInput;
}

interface UpdateChargeUseCaseResponse {
	charge: Charge;
}

export class UpdateChargeUseCase {
	constructor(private chargesRepository: ChargesRepository) {}

	async execute({
		chargeId,
		data,
	}: UpdateChargeUseCaseRequest): Promise<UpdateChargeUseCaseResponse> {
		const charge = await this.chargesRepository.update(chargeId, data);

		return { charge };
	}
}
