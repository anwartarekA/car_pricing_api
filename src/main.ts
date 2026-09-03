import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { sessionCookie } from 'session-cookie';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
    sessionCookie({
      keys: ['anwartarek123@'],
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
