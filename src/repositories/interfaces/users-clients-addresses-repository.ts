import { Prisma, UserClientAddress } from '@prisma/client';

export interface UsersClientsAddressesRepository {
	create(data: Prisma.UserClientAddressCreateManyInput): Promise<UserClientAddress>;

	findByClientId(clientId: string): Promise<UserClientAddress | null>;

	// update(
	// 	clientId: string,
	// 	data: Prisma.UserClientAddressUpdateInput,
	// ): Promise<UserClientAddress>;
}
