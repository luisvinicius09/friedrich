import { Charge, ChargeStatus, Prisma } from '@prisma/client';
import { ChargesRepository } from '../interfaces/charges-repository';
import { z } from 'zod';
import { randomUUID } from 'crypto';

export class InMemoryChargesRepository implements ChargesRepository {
	private charges: Charge[] = [];

	async create(data: Prisma.ChargeCreateManyInput) {
		const chargeSchema = z.object({
			userId: z.string(),
			userClientId: z.string(),
		});

		const { userId, userClientId } = chargeSchema.parse(data);

		const charge = {
			id: randomUUID(),
			userId,
			userClientId,
			status: ChargeStatus.PENDING,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.charges.push(charge);

		return charge;
	}

	async update(chargeId: string, data: Prisma.ChargeUpdateWithoutUserInput) {
		const chargeSchema = z.object({
			id: z.string(),
			userId: z.string(),
			userClientId: z.string(),
		});

		const { id, userId, userClientId } = chargeSchema.parse(data);

		const charge = {
			id,
			userId,
			userClientId,
			status: ChargeStatus.PENDING,
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
