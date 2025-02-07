import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ChatPayloadDto } from './chatpayload.dto';
import { ParticipantDto } from './participant.dto';

export class RoomDto {
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  readonly participant: Array<ParticipantDto>;

  @IsNotEmpty()
  @IsArray()
  readonly payloads: Array<ChatPayloadDto>;
}
