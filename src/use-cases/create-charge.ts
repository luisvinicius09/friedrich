import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { Charge } from '@prisma/client';

interface CreateChargeUseCaseRequest {
	userId: string;
	userClientId: string;
	userProductId: string | null;
	checkoutId?: string | null;
}

interface CreateChargeUseCaseResponse {
	charge: Charge;
}

export class CreateChargeUseCase {
	constructor(private readonly chargeRepository: ChargesRepository) {}

	async execute({
		userId,
		userClientId,
		userProductId,
		checkoutId,
	}: CreateChargeUseCaseRequest): Promise<CreateChargeUseCaseResponse> {
		const charge = await this.chargeRepository.create({
			userId,
			userClientId,
			userProductId,
			checkoutId,
		});

		return {
			charge,
		};
	}
}
