import fastify, { FastifyInstance } from 'fastify';
import fastifyJwt from '@fastify/jwt';

import { appRoutes } from '@/http/routes';
import { ZodError } from 'zod';
import { env } from './env';
import { usersRoutes } from './http/controllers/users/routes';

export const app: FastifyInstance = fastify({});

app.register(fastifyJwt, { secret: env.JWT_SECRET });

app.register(appRoutes);
app.register(usersRoutes);

app.setErrorHandler((error, _req, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error',
			issues: error.format(),
		});
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error);
	} else {
		// TODO: send log to better tools like DataDog/NewRelic/Sentry
	}

	return reply.status(500).send({ message: 'Internal server error' });
});
