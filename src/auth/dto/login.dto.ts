import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email format is incorrect!' })
  @ApiProperty({ example: 'your@email.com', description: 'Your Email Address' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'your p4ssw0rd', description: 'Minimum 8 Character' })
  readonly password: string;
}
