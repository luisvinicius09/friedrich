import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createClient } from './create-client';
import { listClients } from './list-clients';
import { getClient } from './get-client';

export async function clientsRoutes(app: FastifyInstance) {
	app.get('/clients', { onRequest: [verifyJwt] }, listClients);

	app.get('/client/:clientId', { onRequest: [verifyJwt] }, getClient);

	app.post('/client/create', { onRequest: [verifyJwt] }, createClient);
}
