import { Prisma } from '@prisma/client';
import { ChargesRepository } from '../interfaces/charges-repository';
import { prisma } from '@/lib/prisma';

export class PrismaChargesRepository implements ChargesRepository {
	async create(data: Prisma.ChargeCreateManyInput) {
		const charge = await prisma.charge.create({
			data,
		});

		return charge;
	}

	async update(chargeId: string, data: Prisma.ChargeUpdateWithoutUserInput) {
		const charge = await prisma.charge.update({
			where: { id: chargeId },
			data,
		});

		return charge;
	}

	async delete(chargeId: string) {
		await prisma.charge.delete({
			where: { id: chargeId },
		});
	}

	async findByChargeId(chargeId: string) {
		const charge = await prisma.charge.findUnique({
			where: { id: chargeId },
		});

		return charge;
	}

	async findAllByUserId(userId: string) {
		const charges = await prisma.charge.findMany({
			where: {
				userId: userId,
			},
		});

		return charges;
	}
}
