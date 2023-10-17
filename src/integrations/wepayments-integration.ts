import axios, { AxiosResponse } from 'axios';
import {
	CreateChargeDTO,
	CreateChargeResponse,
	CreateChargeType,
	WePaymentsRepository,
} from './interfaces/wepayments';
import { z } from 'zod';

export class WePaymentsIntegration implements WePaymentsRepository {
	private wepaymentsBaseURL = 'https://api.sandbox.wepayout.com.br/v1/payin/payments';

	async createWePaymentsCharge(
		chargeType: CreateChargeType,
		data: CreateChargeDTO,
	): Promise<AxiosResponse<CreateChargeResponse>> {
		const createChargeSchema = z.object({
			expireDate: z.string(),
			amountInCents: z.number(),
			buyer: z.object({
				name: z.string(),
				documentType: z.enum(['CPF', 'CNPJ']),
				document: z.string(),
				address: z.object({
					street: z.string(),
					number: z.string(),
					complement: z.string().optional(),
					zipCode: z.string(), // TODO -> validate this: 99090900
					city: z.string(),
					district: z.string(),
					stateCode: z.string(), // TODO -> validate this: PR
				}),
			}),
			sender: z.object({
				name: z.string(),
				document: z.string(),
			}),
		});

		const { expireDate, amountInCents, buyer, sender } = createChargeSchema.parse(data);

		const request = await axios.post<CreateChargeResponse>(
			`${this.wepaymentsBaseURL}/${chargeType}`,
			{
				callbackUrl:
					'https://0af6-189-90-193-123.ngrok.io/wepayments/handleChargeCallback', // TODO
				// customNumber: '1234',
				title: {
					expireDate: expireDate, // gotta save this
					amountInCents: amountInCents,
					instructions: 'Esse payin é referente à compra do produto X',
				},
				buyer: {
					name: buyer.name,
					document: {
						number: buyer.document,
						type: buyer.documentType,
					},
					address: {
						street: buyer.address.street,
						number: buyer.address.number,
						complement: buyer.address.complement,
						zipCode: buyer.address.zipCode,
						city: buyer.address.city,
						district: buyer.address.district,
						stateCode: buyer.address.stateCode,
					},
				},
				sender: {
					name: sender.name,
					document: sender.document,
					helpdesk: 'Sender helpdesk',
				},
			},
			{
				headers: {
					Authorization:
						'Bearer 3bf5b4f53a1c9314c105dc79be87d61d0eeeec514eb36186cb7bc0a7d55a7d6d',
				},
			},
		);

		return request;
	}

	async getWePaymentsCharge(wepaymentsChargeId: string) {
		throw new Error('Method not implemented.');
	}

	async requestWePaymentsCancelCharge(wepaymentsChargeId: string) {
		const request = await axios.delete(
			`https://api.sandbox.wepayout.com.br/v1/payin/payments/${wepaymentsChargeId}/request-cancel`,
		);

		throw new Error('Method not implemented.');
	}
}
