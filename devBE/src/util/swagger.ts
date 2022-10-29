import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setUpSwagger(app: INestApplication): void {
	const config = new DocumentBuilder()
		.setTitle('waita-swagger-doc')
		.setDescription('API description document')
		.setVersion('1.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/swagger', app, document);
}
