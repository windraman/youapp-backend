import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from '../schemas/users.schema';
import { Query } from 'express-serve-static-core';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findAll(query: Query): Promise<User[]> {
    const resPerPage = 5;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const users = await this.userModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return users;
  }

  async findById(id: string): Promise<User> {
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const birthday = new Date(Date.parse(updateUserDto.profile.birthday));
    updateUserDto.profile.zodiac = getShio(birthday);
    updateUserDto.profile.horoscope = getZodiacSign(birthday);
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });
  }
}

function getZodiacSign(birthday: Date): string {
  let realDateObject = new Date(birthday);
  const day = realDateObject.getDate();
  const month = realDateObject.getMonth() + 1; // getMonth() returns 0 for January, so we add 1

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return 'Aquarius';
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return 'Pisces';
  } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return 'Aries';
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return 'Taurus';
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return 'Gemini';
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return 'Cancer';
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return 'Leo';
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return 'Virgo';
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return 'Libra';
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return 'Scorpio';
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return 'Sagittarius';
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return 'Capricorn';
  } else {
    return 'Invalid date';
  }
}

function getShio(birthday: Date): string {
  let realDateObject = new Date(birthday);
  const year = realDateObject.getFullYear();
  const shio = [
    'Rat',
    'Ox',
    'Tiger',
    'Rabbit',
    'Dragon',
    'Snake',
    'Horse',
    'Goat',
    'Monkey',
    'Rooster',
    'Dog',
    'Pig',
  ];

  // The Chinese zodiac cycle repeats every 12 years
  const baseYear = 1900; // Starting from the year 1900 which is the year of the Rat

  const index = (year - baseYear) % 12;

  return shio[index >= 0 ? index : index + 12];
}
