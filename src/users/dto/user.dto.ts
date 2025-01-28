import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  MinLength,
} from 'class-validator';
import { ProfileUserDto } from './profile-user.dto';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsObject()
  readonly profile: ProfileUserDto;
}
