import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { Prisma, User } from '@prisma/client';
import { z } from 'zod';

export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = [];

	async create(data: Prisma.UserCreateManyInput) {
		const userSchema = z.object({
			name: z.string(),
			email: z.string(),
			password: z.string(),
			document: z.string(),
			phoneNumber: z.number(),
		});

		const { name, email, password, document, phoneNumber } =
			userSchema.parse(data);

		const user = {
			id: 'user-1',
			name: name,
			email: email,
			password: password,
			document: document,
			phoneNumber: phoneNumber,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

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
