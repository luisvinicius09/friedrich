import { Prisma, UserClient } from '@prisma/client';
import { UsersClientsRepository } from '../interfaces/users-clients-repository';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersClientsRepository implements UsersClientsRepository {
	public usersClients: UserClient[] = [];

	private clientSchema = z.object({
		userId: z.string(),
		name: z.string(),
		documentType: z.enum(['CPF', 'CNPJ']),
		document: z.string(),
		phoneNumber: z.number(),
		email: z.string().email(),
	});

	async create(data: Prisma.UserClientUncheckedCreateInput) {
		const { userId, documentType, name, document, phoneNumber, email } =
			this.clientSchema.parse(data);

		const userClient = {
			id: data.id ?? randomUUID(),
			userId: userId,
			name: name,
			documentType: documentType,
			document: document,
			phoneNumber: phoneNumber,
			email: email,
			createdAt: new Date(),
			updatedAt: new Date(),
		} satisfies UserClient;

		this.usersClients.push(userClient);

		return userClient;
	}

	async findAllByUserId(userId: string) {
		const userClients = this.usersClients.filter((item) => item.userId === userId);

		return userClients;
	}

	async findByClientId(clientId: string) {
		const clientIndex = this.usersClients.findIndex((item) => item.id === clientId);

		return this.usersClients[clientIndex] || null;
	}

	async update(clientId: string, data: Prisma.UserClientUpdateInput) {
		const userClient = await this.findByClientId(clientId);

		this.usersClients = this.usersClients.map((item) => {
			if (item.id === clientId) {
				return { ...item, ...data };
			}
		}) as UserClient[];

		return { ...userClient, ...data } as UserClient;
	}
}
