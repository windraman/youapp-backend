import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  signUp(
    @Body(ValidationPipe) sigUpDto: SignUpDto,
  ): Promise<{ token: string }> {
    return this.authService.signUp(sigUpDto);
  }

  @Post('/login')
  login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
