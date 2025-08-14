import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => {
          const constraints = error.constraints
            ? Object.values(error.constraints)
            : [];
          return {
            property: error.property,
            constraints: constraints,
          };
        });
        return new BadRequestException(formattedErrors);
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
