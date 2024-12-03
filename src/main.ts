import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors();

  // API DOCS WITH SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Yoobe API')
    .setDescription('description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3001);

  const url = await app.getUrl();
  if (url.split(':')[0] === 'http') {
    console.log(`Application is running on: ${url}`);
    console.log(`Swagger is running on: ${url}/docs`);
  }
}
bootstrap();
