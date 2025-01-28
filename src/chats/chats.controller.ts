import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AuthGuard } from '@nestjs/passport';
import { ChatPayload } from 'src/schemas/chatpayload.schema';
import { ChatPayloadDto } from './dto/chatpayload.dto';

import { MessagePattern, Payload, Ctx } from '@nestjs/microservices';
import { Socket, io } from 'socket.io-client';

@Controller('chats')
export class ChatsController {
  constructor(private chatService: ChatsService) {}

  // @Get()
  // @UseGuards(AuthGuard())
  // async getUsers(@Query() query: ExpressQuery): Promise<User[]> {
  //   return this.usersService.findAll(query);
  // }

  @Post('/new')
  @UseGuards(AuthGuard())
  async createChat(
    @Req() req,
    @Body(ValidationPipe) chatPayloadDto: ChatPayloadDto,
  ): Promise<ChatPayload> {
    const socket = io('ws://localhost:3001');
    socket.emit('message', chatPayloadDto);
    return this.chatService.createChat(req.user._id.toString(), chatPayloadDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getChats(@Req() req): Promise<ChatPayload[]> {
    return this.chatService.myChats(req.user._id.toString());
  }
}
