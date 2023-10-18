import { FastifyReply, FastifyRequest } from 'fastify';
import { writeFileSync } from 'fs';
import path from 'path';

export default async function handleChargeCallback(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const callbackBody = req.body;

	try {
		console.log('got to the handle callback');
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
