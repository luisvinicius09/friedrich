import { Prisma } from '@prisma/client';
import { CheckoutsRepository } from '../interfaces/checkouts-repository';
import { prisma } from '@/lib/prisma';

export class PrismaCheckoutsRepository implements CheckoutsRepository {
	async create(data: Prisma.CheckoutCreateManyInput) {
		const checkout = await prisma.checkout.create({
			data: data,
		});

		return checkout;
	}

	// async recreateSlug(checkoutId: string) {
	// 	throw new Error('Method not implemented');
	// }

	async findByCheckoutId(checkoutId: string) {
		const checkout = await prisma.checkout.findUnique({
			where: {
				id: checkoutId,
			},
		});

		return checkout;
	}

	async findByChargeId(chargeId: string) {
		const checkout = await prisma.checkout.findUnique({
			where: {
				chargeId: chargeId,
			},
		});

		return checkout;
	}

	async findBySlug(slug: string) {
		const checkout = await prisma.checkout.findUnique({
			where: {
				slug: slug,
			},
		});

		return checkout;
	}
}
