import { ChargesRepository } from '@/repositories/interfaces/charges-repository';
import { Charge } from '@prisma/client';

interface ListChargesUseCaseRequest {
	userId: string;
}

interface ListChargesUseCaseResponse {
	charges: Charge[];
}

export class ListChargesUseCase {
	constructor(private chargesRepository: ChargesRepository) {}

	async execute({
		userId,
	}: ListChargesUseCaseRequest): Promise<ListChargesUseCaseResponse> {
		const charges = await this.chargesRepository.findAllByUserId(userId);

		return {
			charges,
		};
	}
}
