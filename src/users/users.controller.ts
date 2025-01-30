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
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/schemas/users.schema';
import { ProfileUserDto } from './dto/profile-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get()
  // @UseGuards(AuthGuard())
  // async getUsers(@Query() query: ExpressQuery): Promise<User[]> {
  //   return this.usersService.findAll(query);
  // }

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

  // @Get('profile')
  // @UseGuards(AuthGuard())
  // async getProfile(
  //   user: JwtStrategy
  // ): Promise<User> {
  //   return user;
  // }
}
