import { FastifyReply, FastifyRequest } from 'fastify';
import { writeFileSync } from 'fs';
import path from 'path';

interface CallbackBody {
	key: string;
	clientId: number;
	subscriptionId: number;
	clientName: string;
	senderName: string;
	senderDocument: string;
	senderHelpdesk: string;
	buyerName: string;
	buyerDocument: string;
	buyerEmail: string;
	customnumber: string;
	ournumber: string;
	end_to_end: string;
	digitableLine: string;
	barCodenumber: string;
	status: {
		name: string;
		id: string;
	};
	sender: {
		name: string;
		document: string;
		helpdesk: string;
	};
	typePayin: string;
	instructions: string;
	amountCents: number;
	paidAmountCents: number;
	// paidAt: 2019-08-24;
	// expiresAt: 2019-08-24T14:15:22Z;
	// createdAt: 2019-08-24T14:15:22Z;
	fine: {
		percent: number;
		// date: 2019-08-24;
		interest: number;
	};
	discount: {
		percent: string;
		amountInCents: string;
		date: string;
	};
	splits: object[];
	statusHistory: object[];
	// refundMode: FULL_REFUND_RECIPIENT;
	refundAmountCents: number;
	payinRefunds: object[];
	agreement: {
		// number: 666666;
		// digit: 6;
		// agency: 9999;
		// assignorCode: 9999/666666-6
	};
	reason_canceled: {
		id: 0;
		name: string;
	};
	payin_substatus: {
		id: 0;
		name: string;
	};
	kyc: {
		id: string;
	};
	installments: object[];
	hasAdvancement: boolean;
	cards: object[];
	can_checkout: boolean;
}

export default async function handleChargeCallback(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const callbackBody = req.body as CallbackBody;

	try {
		console.log('got to the handle callback');
		// TODO: handle response by updating charge status

		writeFileSync(
			path.join(__dirname, '..', '..', '..', '..', 'logs', 'handle-charge-data.json'),
			JSON.stringify(callbackBody),
		);

		return reply.status(200).send({ message: 'OK' });
	} catch (err) {
		console.log(err);

		return reply.status(500).send({ message: 'failed' });
	}
}
