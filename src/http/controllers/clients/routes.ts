import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createClient } from './create-client';

export async function clientsRoutes(app: FastifyInstance) {
	app.post('/client/create', { onRequest: [verifyJwt] }, createClient);
}
