import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChatPayload } from './chatpayload.schema';
import { Participant } from './participant.schema';

@Schema({
  timestamps: true,
})
export class Room {
  @Prop()
  title: String;

  @Prop()
  participant: Array<Participant>;

  @Prop()
  payloads: Array<ChatPayload>;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
