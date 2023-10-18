import { AxiosResponse } from 'axios';

export interface CreateChargeDTO {
	expireDate: string;
	amountInCents: number;

	buyer: {
		name: string;
		documentType: 'CPF' | 'CNPJ';
		documentNumber: string;
		address: {
			street: string;
			number: string;
			complement: string;
			zipCode: string;
			city: string;
			district: string;
			stateCode: string;
		};
	};

	sender: {
		document: string;
		name: string;
	};
}

export type CreateChargeType = 'boleto' | 'pix' | 'credit-card';

export interface CreateChargeResponse {
	id: number; // gotta save this
	key: string; // gotta save this
	clientId: number;
	subscriptionId: null;
	clientName: string;
	senderName: string;
	senderDocument: string;
	senderHelpdesk: string;
	buyerName: string;
	buyerDocument: string;
	buyerEmail: null;
	customNumber: string;
	ourNumber: string;
	digitableLine: string; // gotta save this
	barCodeNumber: string; // gotta save this
	status: { id: 1; name: 'Criado' };
	sender: { name: string; helpdesk: null; document: null };
	typePayin: 'boleto'; // gotta save this
	instructions: string;
	amountCents: number; // gotta save this
	paidAmountCents: null; // gotta save this
	paidAt: null; // gotta save this
	expiresAt: string;
	createdAt: string;
	fine: null; // gotta save this
	discount: null; // gotta save this
	splits: [];
	statusHistory: [
		{
			status: { id: 1; name: 'Criado' };
			id: number;
			updatedAt: '2023-10-13T18:35:13.000000Z';
		},
	]; // gotta save this
	agreement: {
		number: string;
		digit: string;
		agency: string;
		assignorCode: string;
	};
	// payin_substatus: null;
	// kyc: null;
}

export interface WePaymentsRepository {
	createWePaymentsCharge(
		chargeType: CreateChargeType,
		data: CreateChargeDTO,
	): Promise<AxiosResponse<CreateChargeResponse>>;

	getWePaymentsCharge(wepaymentsChargeId: string): Promise<void>;

	requestWePaymentsCancelCharge(wepaymentsChargeId: string): Promise<void>;
}
