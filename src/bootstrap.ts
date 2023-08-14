import { app } from '@/app';
import { env } from '@/env';

async function bootstrap() {
	try {
		await app
			.listen({
				host: '0.0.0.0',
				port: env.PORT,
			});

		console.log('🎉 Server is running!');
	} catch (err) {
		app.log.error(err);

		process.exit(1);
	}
}

bootstrap();
