import { Checkout, Prisma } from '@prisma/client';

export interface CheckoutsRepository {
	create(data: Prisma.CheckoutCreateManyInput): Promise<Checkout>;

	// recreateSlug(checkoutId: string): Promise<Checkout>;

	findByCheckoutId(checkoutId: string): Promise<Checkout | null>;

	findByChargeId(chargeId: string): Promise<Checkout | null>;

	findBySlug(slug: string): Promise<Checkout | null>;
}
