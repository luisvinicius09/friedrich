import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createCharge(req: FastifyRequest, reply: FastifyReply) {
	const chargeBodySchema = z.object({});

	const {} = chargeBodySchema.parse(req.body);
}
