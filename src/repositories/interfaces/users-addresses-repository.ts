import { Prisma, UserAddress } from '@prisma/client';

export interface UsersAddressesRepository {
	create(data: Prisma.UserAddressUncheckedCreateInput): Promise<UserAddress>;

	findByUserId(userId: string): Promise<UserAddress | null>;

	update(
		userId: string,
		data: Prisma.UserAddressUpdateWithoutUserInput,
	): Promise<UserAddress>;
}
