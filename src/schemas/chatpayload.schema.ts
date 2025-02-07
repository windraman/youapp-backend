import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './users.schema';
import { Participant } from './participant.schema';

@Schema({
  timestamps: true,
})
export class ChatPayload {
  @Prop()
  sender: String;

  @Prop()
  content: String;

  @Prop()
  mode: String;

  @Prop()
  roomid: String;
}

export const ChatPayloadSchema = SchemaFactory.createForClass(ChatPayload);
