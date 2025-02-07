import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiBearerAuth('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiBody({ type: SignUpDto })
  signUp(
    @Body(ValidationPipe) sigUpDto: SignUpDto,
  ): Promise<{ token: string }> {
    return this.authService.signUp(sigUpDto);
  }

  @Post('/login')
  @ApiBody({ type: LoginDto })
  login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
