import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { SocketIoClientStrategy } from './socket-io-client.strategy';
import { SocketIoClientProvider } from './socket-io-client.provider';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { cors: true });
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('YouApp API')
    .setDescription('YouApp API Documentations')
    .setVersion('1.0')
    .addTag('youapp')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  // app.useWebSocketAdapter(new SocketAdapter(app));

  // const appConfig = app.get<ConfigService>(ConfigService);
  // const socketIoClientProvider = app.get<SocketIoClientProvider>(
  //   SocketIoClientProvider,
  // );

  // app.connectMicroservice<MicroserviceOptions>({
  //   strategy: new SocketIoClientStrategy(socketIoClientProvider.getSocket()),
  // });

  // await app.startAllMicroservices();
  app.enableCors({
    origin: 'http://10.0.2.2:3000', // Replace with the client’s address if necessary
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
