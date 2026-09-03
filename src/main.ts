import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const sessionCookie = require('session-cookie');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    sessionCookie({
      secret: 'anwartarek123@',
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
