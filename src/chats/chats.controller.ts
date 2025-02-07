import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AuthGuard } from '@nestjs/passport';
import { ChatPayload } from 'src/schemas/chatpayload.schema';
import { ChatPayloadDto } from './dto/chatpayload.dto';

import { MessagePattern, Payload, Ctx } from '@nestjs/microservices';
import { Socket, io } from 'socket.io-client';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Room } from 'src/schemas/room.schema';
import { RoomDto } from './dto/room.dto';

@ApiTags('Chats')
@Controller('chats')
@ApiBearerAuth('Authorization')
export class ChatsController {
  constructor(private chatService: ChatsService) {}

  @Get('/room')
  @UseGuards(AuthGuard())
  async getRooms(@Req() req): Promise<Room[]> {
    return this.chatService.myRooms(req.user._id.toString());
  }

  @Post('/new')
  @UseGuards(AuthGuard())
  async newRoom(
    @Req() req,
    @Body()
    room: RoomDto,
  ): Promise<Room> {
    return this.chatService.createRoom(req.user._id.toString(), room);
  }
}
