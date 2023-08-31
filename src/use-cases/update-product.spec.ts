import { InMemoryUsersProductsRepository } from '@/repositories/in-memory/in-memory-users-products-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersProductsRepository } from '@/repositories/interfaces/users-products-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { UpdateProductUseCase } from './update-product';

let usersRepository: UsersRepository;
let usersProductsRepositories: UsersProductsRepository;
let sut: UpdateProductUseCase;

describe('Update product use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		usersProductsRepositories = new InMemoryUsersProductsRepository();
		sut = new UpdateProductUseCase(usersProductsRepositories);
	});

	it('should update the product correctly', async () => {
		const user = await usersRepository.create({
			name: 'John Doe',
			document: '123456789',
			email: 'john-doe@gmail.com',
			password: 'jow-doe-pw',
			phoneNumber: 12345678,
		});

		const productCreated = await usersProductsRepositories.create({
			active: true,
			fixedValue: true,
			name: 'Product 1',
			userId: user.id,
			value: 1234,
		});

		expect(productCreated.id).toEqual(expect.any(String));
		expect(productCreated.name).toEqual('Product 1');
		expect(productCreated.active).toEqual(true);

		const { product: updatedProduct } = await sut.execute({
			name: 'Product 2',
			active: false,
			productId: productCreated.id,
		});

		expect(updatedProduct.id).toEqual(productCreated.id);
		expect(updatedProduct.name).toEqual('Product 2');
		expect(updatedProduct.active).toEqual(false);
	});
});
