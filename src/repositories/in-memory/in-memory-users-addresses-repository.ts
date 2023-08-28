import { Prisma, UserAddress } from '@prisma/client';
import { UsersAddressesRepository } from '../interfaces/users-addresses-repository';
import { z } from 'zod';
import { randomUUID } from 'crypto';

export class InMemoryUsersAddressesRepository implements UsersAddressesRepository {
	public usersAddresses: UserAddress[] = [];

	async create(data: Prisma.UserAddressUncheckedCreateInput) {
		const userAddressSchema = z.object({
			street: z.string(),
			number: z.string(),
			neighborhood: z.string(),
			complement: z.string().nullable(),
			userId: z.string(),
		});

		const { street, number, neighborhood, complement, userId } =
			userAddressSchema.parse(data);

		const userAddress = {
			id: data.id ?? randomUUID(),
			street: street,
			number: number,
			neighborhood: neighborhood,
			complement: complement,
			updatedAt: new Date(),
			userId: userId,
		};

		this.usersAddresses.push(userAddress);

		return userAddress;
	}

	async findByUserId(userId: string) {
		const userAddressIndex = this.usersAddresses.findIndex(
			(item) => item.userId === userId,
		);

		return this.usersAddresses[userAddressIndex] || null;
	}

	async update(userId: string, data: Prisma.UserAddressUpdateWithoutUserInput) {
		const userAddress = await this.findByUserId(userId);

		this.usersAddresses = this.usersAddresses.map((item) => {
			if (item.userId === userId) {
				return { ...item, ...data };
			}
		}) as UserAddress[];

		return { ...userAddress, ...data } as UserAddress;
	}
}
