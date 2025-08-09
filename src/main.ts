import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
  console.log('🚀 playground url is: https://studio.apollographql.com/box/ㅁㄴㅇ');
  console.log('🚀 playground url is: https://studio.apollographql.com/sandbox/explorer');
}
bootstrap();
