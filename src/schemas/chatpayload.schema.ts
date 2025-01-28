import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './users.schema';
import { Participant } from './participant.schema';

@Schema({
  timestamps: true,
})
export class ChatPayload {
  @Prop()
  content: String;

  @Prop()
  mode: String;

  @Prop()
  participant: Array<Participant>;
}

export const ChatPayloadSchema = SchemaFactory.createForClass(ChatPayload);
