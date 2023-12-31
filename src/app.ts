import fastify, { FastifyInstance } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';

import { ZodError } from 'zod';
import { env } from './env';
import { usersRoutes } from './http/controllers/users/routes';
import { productsRoutes } from './http/controllers/products/routes';
import { clientsRoutes } from './http/controllers/clients/routes';
import { chargesRoutes } from './http/controllers/charges/routes';
import { checkoutsRoutes } from './http/controllers/checkout/routes';
import { wePaymentsRoutes } from './http/controllers/wePayments/routes';
// import { format } from 'winston';

// const formatter = format.printf(({ level, message, label, timestamp }) => {
// 	return `${timestamp} [${label}] ${level}: ${message}`;
// });

// const options = {
// 	error: {
// 		level: 'error',
// 		format: format.combine(format.timestamp(), formatter),
// 		handleExeption: true,
// 		json: true,
// 		colorize: true,
// 	},
// 	info: {
// 		level: 'info',
// 		format: format.combine(format.timestamp(), formatter),
// 		handleExeption: false,
// 		json: true,
// 		colorize: true,
// 	},
// 	console: {
// 		format: format.simple(),
// 		level: 'debug',
// 		handleException: true,
// 		json: false,
// 		colorize: true,
// 	},
// };

export const app: FastifyInstance = fastify({
	logger: true,
});

app.register(fastifyJwt, { secret: env.JWT_SECRET });

app.register(fastifyCors);

app.register(usersRoutes);
app.register(productsRoutes);
app.register(clientsRoutes);
app.register(chargesRoutes);
app.register(checkoutsRoutes);
app.register(wePaymentsRoutes);

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
