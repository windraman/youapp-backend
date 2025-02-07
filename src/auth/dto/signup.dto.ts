import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { EmailExist } from '../email-exist';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'your_username', description: 'New username' })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email format is incorrect!' })
  @ApiProperty({ example: 'your@email.com', description: 'Your Email Address' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'your password', description: 'Your New Password' })
  readonly password: string;
}
