import { Charge, Prisma } from '@prisma/client';

export interface ChargesRepository {
	create(data: Prisma.ChargeCreateManyInput): Promise<Charge>;

	update(chargeId: string, data: Prisma.ChargeUpdateWithoutUserInput): Promise<Charge>;

	delete(chargeId: string): Promise<void>;

	findByChargeId(chargeId: string): Promise<Charge | null>;

	findAllByUserId(userId: string): Promise<Charge[]>;

	updateStatus(chargeId: string, statusId: number): Promise<Charge>;
}
