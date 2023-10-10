import { Charge, ChargeStatus, Prisma } from '@prisma/client';
import { ChargesRepository } from '../interfaces/charges-repository';
import { z } from 'zod';
import { randomUUID } from 'crypto';

export class InMemoryChargesRepository implements ChargesRepository {
	private charges: Charge[] = [];

	private chargeSchema = z.object({
		userId: z.string(),
		userClientId: z.string().nullable(),
		userProductId: z.string().nullable(),
		checkoutId: z.string().nullable(),
	});

	private updateChargeSchema = this.chargeSchema.extend({
		id: z.string(),
	});

	async create(data: Prisma.ChargeCreateManyInput) {
		const { userId, userClientId, userProductId, checkoutId } =
			this.chargeSchema.parse(data);

		const charge = {
			id: randomUUID(),
			userId,
			userClientId,
			userProductId,
			status: ChargeStatus.PENDING,
			checkoutId: checkoutId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.charges.push(charge);

		return charge;
	}

	async update(chargeId: string, data: Prisma.ChargeUpdateWithoutUserInput) {
		const { id, userId, userClientId, userProductId, checkoutId } =
			this.updateChargeSchema.parse(data);

		const charge = {
			id,
			userId,
			userClientId,
			userProductId,
			status: ChargeStatus.PENDING,
			checkoutId: checkoutId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.charges.push(charge);

		return charge;
	}

	async delete(chargeId: string) {
		const chargeIdx = this.charges.findIndex((charge) => charge.id === chargeId);

		this.charges.splice(chargeIdx, 1);
	}

	async findByChargeId(chargeId: string) {
		const chargeIdx = this.charges.findIndex((charge) => charge.id === chargeId);

		return this.charges[chargeIdx] ?? null;
	}

	async findAllByUserId(userId: string) {
		const charges = this.charges.filter((charge) => charge.userId === userId);

		return charges;
	}
}
