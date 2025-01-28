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

  @IsEnum(['Male', 'Female'])
  readonly gender: 'Male' | 'Female';

  @IsDate()
  readonly birthday: Date;

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
}
