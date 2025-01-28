import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { ParticipantDto } from './participant.dto';

export class ChatPayloadDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsString()
  readonly mode: string;

  @IsNotEmpty()
  @IsArray()
  readonly participant: Array<ParticipantDto>;
}
