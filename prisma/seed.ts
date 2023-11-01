import { ChargeStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const chargeStatuses = [
		{
			id: 1,
			statusName: 'CREATED',
			description: 'The first status when the payin is created.',
			external_name: 'PAYIN_CREATED',
		},
		{
			id: 2,
			statusName: 'CANCELED',
			description: 'Payin canceled due to expiration.',
			external_name: 'PAYIN_CANCELED',
		},
		{
			id: 3,
			statusName: 'PAID',
			description: 'Payin was paid.',
			external_name: 'PAYIN_PAID',
		},
		{
			id: 4,
			statusName: 'CREDITED',
			description: 'Payin was paid and the amount was credited on your wallet.',
			external_name: 'PAYIN_CREDITED',
		},
		{
			id: 5,
			statusName: 'DROP_REQUESTED',
			description: 'Payin expiration requested.',
			external_name: 'PAYIN_DROP_REQUESTED',
		},
		{
			id: 6,
			statusName: 'AWAITING_APPROVAL',
			description:
				'When the checkout is made, the charge goes from CREATED to PAYIN_AWAITING_APPROVAL (intermediate status) before the confirmation or any other payment final status occurs.',
			external_name: 'PAYIN_AWAITING_APPROVAL',
		},
		{
			id: 7,
			statusName: 'PAYIN_REJECTED',
			description: 'The payment was rejected and could not be processed.',
			external_name: 'PAYIN_REJECTED',
		},
	] satisfies Omit<ChargeStatus, 'createdAt' | 'updatedAt'>[];

	for (const chargeStatus of chargeStatuses) {
		await prisma.chargeStatus.upsert({
			create: {
				id: chargeStatus.id,
				statusName: chargeStatus.statusName,
				description: chargeStatus.description,
			},
			where: {
				id: chargeStatus.id,
				OR: [{ statusName: chargeStatus.statusName }],
			},
			update: {},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit();
	});
