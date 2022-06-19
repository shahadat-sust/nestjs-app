import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './config/typeorm.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Item API')
      .setDescription('My Item API')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, "jwt")
      .setBasePath("api")
      .build());
      SwaggerModule.setup('docs', app, document);
  }

  await app.listen(3000);
}
bootstrap();
