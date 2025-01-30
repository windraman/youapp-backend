import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class ProfileUserDto {
  @IsString()
  readonly name: string;

  @IsEnum(['Not Selected', 'Male', 'Female'])
  readonly gender: 'Not Selected' | 'Male' | 'Female';

  @IsDate()
  readonly birthday: string;

  @IsString()
  horoscope: string;

  @IsString()
  zodiac: string;

  @IsNumber()
  readonly height: number;

  @IsNumber()
  readonly weight: number;

  @IsArray()
  readonly interests: Array<string>;

  @IsString()
  readonly image: string;
}
