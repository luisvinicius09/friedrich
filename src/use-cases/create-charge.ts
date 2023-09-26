import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { Charge } from '@prisma/client';

interface CreateChargeUseCaseRequest {
	userId: string;
	userClientId: string;
}

interface CreateChargeUseCaseResponse {
	charge: Charge;
}

export class CreateChargeUseCase {
	constructor(private readonly chargeRepository: ChargesRepository) {}

	async execute({
		userId,
		userClientId,
	}: CreateChargeUseCaseRequest): Promise<CreateChargeUseCaseResponse> {
		const charge = await this.chargeRepository.create({ userId, userClientId });

		return {
			charge,
		};
	}
}
