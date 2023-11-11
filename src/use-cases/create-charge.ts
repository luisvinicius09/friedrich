import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { Charge, PaymentType } from '@prisma/client';

interface CreateChargeUseCaseRequest {
	userId: string;
	userClientId: string | null;
	userProductId: string | null;
	amountInCents: number;
	expireDate: Date;
	selectedPaymentTypes: PaymentType[];
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
		amountInCents,
		expireDate,
		selectedPaymentTypes,
	}: CreateChargeUseCaseRequest): Promise<CreateChargeUseCaseResponse> {
		const charge = await this.chargeRepository.create({
			userId,
			userClientId,
			userProductId,
			amountInCents,
			expireDate,
			selectedPaymentTypes,
		});

		return {
			charge,
		};
	}
}
