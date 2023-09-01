import { InMemoryUsersProductsRepository } from '@/repositories/in-memory/in-memory-users-products-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersProductsRepository } from '@/repositories/interfaces/users-products-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { RemoveProductUseCase } from './remove-product';

let usersRepository: UsersRepository;
let usersProductsRepository: UsersProductsRepository;
let sut: RemoveProductUseCase;

describe('Remove product use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		usersProductsRepository = new InMemoryUsersProductsRepository();
		sut = new RemoveProductUseCase(usersProductsRepository);
	});

	it('should remove the product correctly', async () => {
		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'joe-doe@email.com',
			document: '123456789',
			password: 'joe-doe-pw',
			phoneNumber: 123456789,
		});

		const userProduct = await usersProductsRepository.create({
			active: true,
			fixedValue: true,
			name: 'Product 1',
			userId: user.id,
			value: 1234,
		});

		expect(userProduct.id).toEqual(expect.any(String));

		const userProductCreated = await usersProductsRepository.findByProductId(
			userProduct.id,
		);

		expect(userProductCreated?.id).toEqual(userProduct.id);
		expect(userProductCreated?.name).toEqual('Product 1');

		await sut.execute({ productId: userProduct.id });

		const userProductExists = await usersProductsRepository.findByProductId(
			userProduct.id,
		);

		expect(userProductExists).toBeNull();
	});
});
