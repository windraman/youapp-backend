import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'full name', description: 'Full name' })
  readonly name: string;

  @IsEnum(['Not Selected', 'Male', 'Female'])
  @ApiProperty({ example: 'Male', description: 'Select Gender' })
  readonly gender: 'Not Selected' | 'Male' | 'Female';

  @IsDate()
  @ApiProperty({ example: '1980-06-28', description: 'Date Format' })
  readonly birthday: string;

  @IsString()
  horoscope: string;

  @IsString()
  zodiac: string;

  @IsNumber()
  @ApiProperty({ example: '170', description: 'Integer' })
  readonly height: number;

  @IsNumber()
  @ApiProperty({ example: '70', description: 'Integer' })
  readonly weight: number;

  @IsArray()
  @ApiProperty({ example: '["Music","Sport"]', description: 'Array' })
  readonly interests: Array<string>;

  @IsString()
  readonly image: string;
}
