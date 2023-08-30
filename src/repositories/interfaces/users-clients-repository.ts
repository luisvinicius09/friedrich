import { Prisma, UserClient } from '@prisma/client';

export interface UsersClientsRepository {
	create(data: Prisma.UserClientUncheckedCreateInput): Promise<UserClient>;

	findAllByUserId(userId: string): Promise<UserClient[]>;

	findByClientId(clientId: string): Promise<UserClient | null>;

	update(clientId: string, data: Prisma.UserClientUpdateInput): Promise<UserClient>;
}
