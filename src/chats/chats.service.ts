import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Query } from 'mongoose';
import { ChatPayload } from 'src/schemas/chatpayload.schema';
import { ChatPayloadDto } from './dto/chatpayload.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Participant } from 'src/schemas/participant.schema';
import { Room } from 'src/schemas/room.schema';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(ChatPayload.name)
    private chatPayloadModel: Model<ChatPayload>,
    @InjectModel(Room.name)
    private roomModel: Model<Room>,
  ) {}

  async createRoom(id: string, roomDto: RoomDto): Promise<Room> {
    const { participant, payloads } = roomDto;
    participant.push({
      user: id,
      role: 'OWNER',
      stats: 2,
    });

    const room = await this.roomModel.create({
      participant,
      payloads,
    });

    participant.forEach(function (value) {
      console.log(value);
    });

    roomDto.payloads[0].sender = id;
    roomDto.payloads[0].roomid = room._id.toString();

    await this.roomModel.findByIdAndUpdate(room._id, roomDto, {
      new: true,
      runValidators: true,
    });

    return room;
  }

  async addChat(chatPayload: ChatPayload): Promise<ChatPayload> {
    const room = await this.roomModel.findById(chatPayload.roomid);

    room.payloads.push(chatPayload);

    await this.roomModel.findByIdAndUpdate(chatPayload.roomid, room, {
      new: true,
      runValidators: true,
    });

    return chatPayload;
  }

  async myChats(id: string): Promise<ChatPayload[]> {
    const payloads = await this.chatPayloadModel.find({
      'participant.user': id,
      'participant.stats': 0,
    });

    if (payloads.length == 0) {
      throw new NotFoundException('Chats not found.');
    }

    return payloads;
  }

  async myRooms(id: string): Promise<Room[]> {
    const rooms = await this.roomModel.find({
      'participant.user': id,
    });

    if (rooms.length == 0) {
      throw new NotFoundException('Rooms not found.');
    }

    return rooms;
  }

  //   async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //     updateUserDto.profile.zodiac = getShio(updateUserDto.profile.birthday);
  //     updateUserDto.profile.horoscope = getZodiacSign(
  //       updateUserDto.profile.birthday,
  //     );
  //     return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
  //       new: true,
  //       runValidators: true,
  //     });
  //   }
}
