import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Profile } from './profile.schema';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: String;

  @Prop({ unique: [true, 'Duplicate email entered !'] })
  email: String;

  @Prop()
  password: String;

  @Prop()
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
