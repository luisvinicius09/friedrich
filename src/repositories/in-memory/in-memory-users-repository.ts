import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { Prisma, User } from '@prisma/client';

export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = [];

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: 'user-1',
			name: data.name ?? null,
			email: data.email,
			password: data.password,
			createdAt: new Date(),
		};

		this.users.push(user);

		return user;
	}

	async findUserByEmail(email: string) {
		const user = this.users.find((user) => user.email === email) ?? null;

		return user;
	}

}