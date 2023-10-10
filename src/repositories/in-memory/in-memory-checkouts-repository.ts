import { Checkout, Prisma } from '@prisma/client';
import { CheckoutsRepository } from '../interfaces/checkouts-repository';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';

export class InMemoryCheckoutsRepository implements CheckoutsRepository {
	private checkouts: Checkout[] = [];

	private checkoutSchema = z.object({
		userId: z.string(),
		chargeId: z.string(),
	});

	async create(data: Prisma.CheckoutCreateManyInput) {
		const { userId, chargeId } = this.checkoutSchema.parse(data);

		const checkout = {
			id: randomUUID(),
			userId: userId,
			chargeId: chargeId,
			createdAt: new Date(),
			updatedAt: new Date(),
			slug: randomUUID(),
		} satisfies Checkout;

		this.checkouts.push(checkout);

		return checkout;
	}

	// async recreateSlug(checkoutId: string) {
	// 	throw new Error('Method not implemented');
	// }

	async findByCheckoutId(checkoutId: string) {
		const checkoutIdx = this.checkouts.findIndex(
			(checkout) => checkout.id === checkoutId,
		);

		return this.checkouts[checkoutIdx] ?? null;
	}

	async findByChargeId(chargeId: string) {
		const checkoutIdx = this.checkouts.findIndex(
			(checkout) => checkout.chargeId === chargeId,
		);

		return this.checkouts[checkoutIdx] ?? null;
	}

	async findBySlug(slug: string) {
		const checkoutIdx = this.checkouts.findIndex((checkout) => {
			checkout.slug === slug;
		});

		return this.checkouts[checkoutIdx] ?? null;
	}
}
