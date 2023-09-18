import { InMemoryUsersProductsRepository } from '@/repositories/in-memory/in-memory-users-products-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersProductsRepository } from '@/repositories/interfaces/users-products-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetProductUseCase } from './get-product';

let usersRepository: UsersRepository;
let usersProductsRepository: UsersProductsRepository;
let sut: GetProductUseCase;

describe('Get product use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		usersProductsRepository = new InMemoryUsersProductsRepository();
		sut = new GetProductUseCase(usersProductsRepository);
	});

	it('should get product correctly', async () => {
		const user = await usersRepository.create({
			document: '123456789',
			email: 'john-doe@email.com',
			name: 'John Doe',
			password: 'john-doe-pw',
			phoneNumber: 123456789,
		});

		const productCreated = await usersProductsRepository.create({
			active: true,
			fixedValue: false,
			name: 'Product 1',
			userId: user.id,
			value: 1234,
		});

		const { product } = await sut.execute({
			productId: productCreated.id,
		});

		expect(product.id).toEqual(productCreated.id);
		expect(product.name).toEqual('Product 1');
		expect(product.value).toEqual(1234);
		expect(product.active).toEqual(true);
		expect(product.userId).toEqual(user.id);
	});
});
