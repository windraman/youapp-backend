import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Messanger {
  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  type: string;

  @Prop()
  viewed: boolean;

  @Prop()
  isNewMsg: boolean;

  @Prop()
  notifyName: string;

  @Prop()
  body: string;
}

export const MessangerSchema = SchemaFactory.createForClass(Messanger);
