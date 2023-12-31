import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { Charge } from '@prisma/client';

interface CreateChargeOptions {
	checkoutId?: string | null;
	userClientId?: string | null;
	userProductId?: string | null;
}

export async function _unit_createCharge(
	userId: string,
	chargesRepository: ChargesRepository,
	{ checkoutId = null, userClientId = null, userProductId = null }: CreateChargeOptions,
): Promise<Charge> {
	const charge = await chargesRepository.create({
		userId,
		checkoutId: checkoutId,
		userClientId: userClientId,
		userProductId: userProductId,
		amountInCents: 8451,
		expireDate: new Date(),
		statusId: 1,
		selectedPaymentTypes: ['BOLETO', 'CREDIT_CARD', 'PIX'],
	});

	return charge;
}
