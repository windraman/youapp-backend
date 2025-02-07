import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/schemas/users.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth('Authorization')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getUser(@Req() req): Promise<User> {
    return this.usersService.findById(req.user._id);
  }

  @Put('profile')
  @UseGuards(AuthGuard())
  async updateUser(
    @Body()
    profile: UpdateUserDto,
    @Req() req,
  ): Promise<User> {
    return this.usersService.updateById(req.user._id, profile);
  }
}
