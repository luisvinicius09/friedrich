import axios, { AxiosResponse } from 'axios';
import {
	CreateChargeDTO,
	CreateChargeResponse,
	CreateChargeType,
	WePaymentsRepository,
} from './interfaces/wepayments';
import { z } from 'zod';
import { env } from '@/env';

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
				documentNumber: z.string(),
				email: z.string().email(),
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
					`${env.BASE_URL}/wepayments/handleChargeCallback`, // TODO
				// customNumber: '1234',
				title: {
					expireDate: expireDate, // gotta save this
					amountInCents: amountInCents,
					instructions: 'Esse payin é referente à compra do produto X',
				},
				buyer: {
					name: buyer.name,
					document: {
						number: buyer.documentNumber,
						type: buyer.documentType,
					},
					email: buyer.email,
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
						`Bearer ${env.WEPAYMENTS_API_KEY}`,
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
