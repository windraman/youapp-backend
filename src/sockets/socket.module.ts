import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SocketsGateway } from './socket-gateway';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSchema } from 'src/schemas/users.schema';
import { ChatsService } from '../chats/chats.service';
import { ChatPayloadSchema } from 'src/schemas/chatpayload.schema';
import { RoomSchema } from 'src/schemas/room.schema';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([
      { name: 'ChatPayload', schema: ChatPayloadSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
  ],
  providers: [SocketsGateway, WsAuthGuard, ChatsService],
  exports: [WsAuthGuard], // Export the guard if needed elsewhere
})
export class SocketsModule {}
