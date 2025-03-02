import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const config = new DocumentBuilder()
    .setTitle('Gerenciador de Pedidos')
    .setDescription('Documentação da API para gerenciamento de pedidos')
    .setVersion('1.0')
    .addBearerAuth() // Se usar JWT
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }) // Se usar API Key
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
