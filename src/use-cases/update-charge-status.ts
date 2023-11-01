import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { Charge } from '@prisma/client';

interface UpdateChargeStatusUseCaseRequest {
	chargeId: string;
	statusId: number;
}

interface UpdateChargeStatusUseCaseResponse {
	charge: Charge;
}

export class UpdateChargeStatusUseCase {
	constructor(private chargesRepository: ChargesRepository) {}

	async execute({
		chargeId,
		statusId,
	}: UpdateChargeStatusUseCaseRequest): Promise<UpdateChargeStatusUseCaseResponse> {
		const charge = await this.chargesRepository.updateStatus(chargeId, statusId);

		return { charge };
	}
}
