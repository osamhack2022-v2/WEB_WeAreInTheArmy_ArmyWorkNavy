import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpSwagger } from './util/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});
	setUpSwagger(app);
	await app.listen(3000);
}
bootstrap();

// allowedHeaders: [
// 	'X-Requested-With',
// 	'Access-Control-Allow-Headers',
// 	'Origin',
// 	'Accept',
// 	'Content-Type',
// 	'Access-Control-Request-Method',
// 	'Access-Control-Request-Headers',
// ],
