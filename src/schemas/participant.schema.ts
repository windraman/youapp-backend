import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './users.schema';

@Schema({
  timestamps: true,
})
export class Participant {
  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  //   user: User;

  @Prop()
  user: String;

  @Prop()
  role: String;

  @Prop()
  stats: Number;
}

export const ChatPayloadSchema = SchemaFactory.createForClass(Participant);
