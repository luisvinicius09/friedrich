import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
	create(data: Prisma.UserCreateManyInput): Promise<User>;

	findByEmail(email: string): Promise<User | null>;

	findByUserId(userId: string): Promise<User | null>;

	update(userId: string, data: Prisma.UserUncheckedUpdateManyInput): Promise<User>;
}
