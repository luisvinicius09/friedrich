import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { Prisma, User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { z } from 'zod';

export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = [];

	private userSchema = z.object({
		name: z.string(),
		email: z.string(),
		password: z.string(),
		documentType: z.enum(['CPF', 'CNPJ']),
		document: z.string(),
		phoneNumber: z.number(),
		isAdmin: z.boolean().optional(),
	});

	async create(data: Prisma.UserCreateManyInput) {
		const { name, email, documentType, password, document, phoneNumber, isAdmin } =
			this.userSchema.parse(data);

		const user = {
			id: randomUUID(),
			name: name,
			email: email,
			password: password,
			documentType: documentType,
			document: document,
			phoneNumber: phoneNumber,
			isAdmin: isAdmin ?? false,
			createdAt: new Date(),
			updatedAt: new Date(),
		} satisfies User;

		this.users.push(user);

		return user;
	}

	async findByEmail(email: string) {
		const user = this.users.find((user) => user.email === email) ?? null;

		return user;
	}

	async findByUserId(userId: string) {
		const user = this.users.find((user) => user.id === userId);

		return user || null;
	}

	async update(userId: string, data: Prisma.UserUncheckedUpdateManyInput) {
		const userIndex = this.users.findIndex((user) => user.id === userId);

		const user = {
			...this.users[userIndex],
			...data,
		};

		this.users[userIndex] = user as User;

		return user as User;
	}
}
