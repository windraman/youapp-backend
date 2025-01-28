import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatPayloadDto } from './chats/dto/chatpayload.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3001, { cors: true })
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  //   handleMessage(client,data): void {
  handleMessage(@MessageBody() message: ChatPayloadDto): void {
    Logger.log(message);
    this.server.emit('message', message);
  }
}
