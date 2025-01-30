import { IsString } from 'class-validator';

export class ProfileImageDto {
  @IsString()
  readonly image: string;
}
