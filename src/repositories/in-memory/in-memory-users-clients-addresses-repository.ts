import { Prisma, UserClientAddress } from '@prisma/client';
import { UsersClientsAddressesRepository } from '../interfaces/users-clients-addresses-repository';
import { z } from 'zod';

export class InMemoryUsersClientsAddressesRepository
	implements UsersClientsAddressesRepository
{
	private clientAddresses: UserClientAddress[] = [];

	private userClientAddressSchema = z.object({
		street: z.string(),
		number: z.string(),
		complement: z.string(),
		zipCode: z.string(),
		city: z.string(),
		district: z.string(),
		stateCode: z.string(),
		userClientId: z.string(),
	});

	async create(data: Prisma.UserClientAddressCreateManyInput) {
		const {
			street,
			number,
			complement,
			zipCode,
			city,
			district,
			stateCode,
			userClientId,
		} = this.userClientAddressSchema.parse(data);

		const userClientAddress = {
			street,
			number,
			complement,
			zipCode,
			city,
			district,
			stateCode,
			userClientId,
		};

		this.clientAddresses.push(userClientAddress);

		return userClientAddress;
	}

	async findByClientId(clientId: string) {
		const userClientAddressIdx = this.clientAddresses.findIndex(
			(item) => item.userClientId === clientId,
		);

		return this.clientAddresses[userClientAddressIdx] ?? null;
	}
}
