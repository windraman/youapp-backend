import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { Number } from 'mongoose';
import { Participant } from 'src/schemas/participant.schema';

export class ParticipantDto {
  @IsNotEmpty()
  @IsString()
  readonly user: String;

  @IsNotEmpty()
  @IsString()
  readonly role: String;

  @IsNotEmpty()
  @IsNumber()
  readonly stats: number;
}
