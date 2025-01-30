import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Profile {
  @Prop()
  name: String;

  @Prop()
  gender: String;

  @Prop()
  birthday: String;

  @Prop()
  horoscope: String;

  @Prop()
  zodiac: String;

  @Prop()
  height: Number;

  @Prop()
  weight: Number;

  @Prop()
  interests: Array<String>;

  @Prop()
  image: String;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
