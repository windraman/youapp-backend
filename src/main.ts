import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import { SocketIoAdapter } from './sockets/socketio.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('YouApp API')
    .setDescription('YouApp API Documentations')
    .setVersion('1.0')
    .addTag('youapp')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'Authorization',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  app.enableCors({
    origin: 'http://10.0.2.2:3000', // Replace with the client’s address if necessary
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
