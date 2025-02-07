import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatPayloadSchema } from 'src/schemas/chatpayload.schema';
import { UserSchema } from 'src/schemas/users.schema';
import { RoomSchema } from 'src/schemas/room.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'ChatPayload', schema: ChatPayloadSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
  ],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
