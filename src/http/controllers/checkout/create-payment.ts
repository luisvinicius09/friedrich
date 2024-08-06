import { env } from '@/env';
import axios, { AxiosError } from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { writeFileSync } from 'fs';
import path from 'path';

export async function createPayment(req: FastifyRequest, reply: FastifyReply) {
	try {
		const request = await axios.post(
			// 'https://api.sandbox.wepayout.com.br/v1/payin/payments/pix',
			'https://api.sandbox.wepayout.com.br/v1/payin/payments/boleto',
			{
				callbackUrl:
					'https://0af6-189-90-193-123.ngrok.io/wepayments/handleChargeCallback',
				customNumber: '1234',
				title: {
					expireDate: '2023-10-21', // gotta save this
					amountInCents: 8652,
					instructions: 'Esse payin é referente à compra do produto X',
				},
				buyer: {
					name: 'Josefino da Silva',
					document: {
						number: '01234567890',
						type: 'CPF',
					},
					address: {
						street: 'Rua da praça',
						number: '123',
						complement: 'conjunto comercial',
						zipCode: '99090900',
						city: 'Curitiba',
						district: 'Centro',
						stateCode: 'PR',
					},
				},
				sender: {
					name: 'Sender name',
					document: '01234567890',
					helpdesk: 'Sender helpdesk',
				},
			},
			{
				headers: {
					Authorization: `Bearer ${env.WEPAYMENTS_API_KEY}`,
				},
			},
		);

		console.log('status', request.status);
		writeFileSync(
			path.join(__dirname, '..', '..', '..', '..', 'logs', 'request-data.json'),
			JSON.stringify(request.data),
		);

		return reply.status(200).send({ message: 'OK' });
	} catch (err) {
		if (err instanceof AxiosError) {
			if (err.response) {
				return reply.status(500).send({ error: err.response.data });
			}
		}

		console.log(err);

		return reply.status(500).send({ message: 'failed' });
	}
}
