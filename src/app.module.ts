import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chats/chats.module';
import { SocketIoClientProvider } from './socket-io-client.provider';
import { ChatGateway } from './chat.gateway';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    AuthModule,
    ChatsModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketIoClientProvider, ChatGateway],
  // providers: [AppService, ChatGateway],
})
export class AppModule {}
