import { describe, it, beforeEach, expect } from 'vitest';
import { CreateProductUseCase } from './create-product';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { UsersProductsRepository } from '@/repositories/interfaces/users-products-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryUsersProductsRepository } from '@/repositories/in-memory/in-memory-users-products-repository';
import { _unit_createUser } from '@/utils/test/unit/create-user';

let usersRepository: UsersRepository;
let usersProductsRepository: UsersProductsRepository;
let sut: CreateProductUseCase;

describe('Create product use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		usersProductsRepository = new InMemoryUsersProductsRepository();
		sut = new CreateProductUseCase(usersProductsRepository);
	});

	it('should create a product correctly', async () => {
		const user = await _unit_createUser(usersRepository);

		const { userProduct } = await sut.execute({
			active: true,
			fixedValue: true,
			name: 'Product 1',
			userId: user.id,
			value: 1234,
		});

		expect(userProduct.id).toEqual(expect.any(String));
	});
});
