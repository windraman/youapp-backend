import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/schemas/users.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getUser(@Req() req): Promise<User> {
    return this.usersService.findById(req.user._id);
  }

  @Patch('profile')
  @UseGuards(AuthGuard())
  async updateUser(
    @Body()
    profile: UpdateUserDto,
    @Req() req,
  ): Promise<User> {
    return this.usersService.updateById(req.user._id, profile);
  }
}
