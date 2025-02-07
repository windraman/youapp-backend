import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';
import { ChatsService } from '../chats/chats.service';
import { ChatPayload } from 'src/schemas/chatpayload.schema';

@WebSocketGateway({ cors: true }) // Enable CORS if needed
export class SocketsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(ChatPayload.name)
    private chatPayloadModel: Model<ChatPayload>,
    private chatService: ChatsService,
  ) {}
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(WsAuthGuard) // Apply the Guard
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const user = await this.userModel.findById(client.data.user.id);
    const message = JSON.parse(data);
    console.log(message);

    console.log(`Received message: ${data} from ${user.profile.name}`);

    this.chatService.addChat(message);

    // Broadcast message to all connected clients
    this.server.emit('message', { sender: user.username, message: data });
  }
}
