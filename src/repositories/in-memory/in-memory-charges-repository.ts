import { Charge, PaymentType, Prisma } from '@prisma/client';
import { ChargesRepository } from '../interfaces/charges-repository';
import { z } from 'zod';
import { randomUUID } from 'crypto';

export class InMemoryChargesRepository implements ChargesRepository {
	private charges: Charge[] = [];

	private chargeSchema = z.object({
		statusId: z.number().optional(),
		userId: z.string(),
		userClientId: z.string().nullable(),
		userProductId: z.string().nullable(),
		checkoutId: z.string().nullable(),
		expireDate: z.date(),
		amountInCents: z.number().positive(),
		selectedPaymentTypes: z.array(
			z.enum([PaymentType.BOLETO, PaymentType.PIX, PaymentType.CREDIT_CARD]).,
		),
	});

	private updateChargeSchema = this.chargeSchema.extend({
		id: z.string(),
	});

	async create(data: Prisma.ChargeCreateManyInput) {
		const {
			userId,
			userClientId,
			userProductId,
			checkoutId,
			expireDate,
			amountInCents,
			selectedPaymentTypes,
			statusId,
		} = this.chargeSchema.parse(data);

		const charge = {
			id: randomUUID(),
			userId,
			userClientId,
			userProductId,
			expireDate,
			amountInCents,
			selectedPaymentTypes,
			statusId: statusId ?? 1,
			checkoutId: checkoutId,
			createdAt: new Date(),
			updatedAt: new Date(),
		} satisfies Charge;

		this.charges.push(charge);

		return charge;
	}

	async update(chargeId: string, data: Prisma.ChargeUpdateWithoutUserInput) {
		const {
			id,
			userId,
			userClientId,
			userProductId,
			checkoutId,
			expireDate,
			amountInCents,
			selectedPaymentTypes,
			statusId,
		} = this.updateChargeSchema.parse(data);

		const charge = {
			id,
			userId,
			userClientId,
			userProductId,
			expireDate,
			amountInCents,
			selectedPaymentTypes,
			statusId: statusId ?? 1,
			checkoutId: checkoutId,
			createdAt: new Date(),
			updatedAt: new Date(),
		} satisfies Charge;

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

	async updateStatus(chargeId: string, statusId: string) {
		throw new Error('Method not implemented.');
	}
}
