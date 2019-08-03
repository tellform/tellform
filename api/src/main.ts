import {NestFactory, Reflector} from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';
const pkg = require('../package.json')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({ origin: '*' });
  // app.getHttpAdapter().options('*', cors());

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
    transform: true,
  }));

  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const options = new DocumentBuilder()
    .setTitle('OhMyForm')
    .setDescription('API documentation')
    .setVersion(pkg.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}

bootstrap();
