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

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(ChatPayload.name)
    private chatPayloadModel: Model<ChatPayload>,
  ) {}

  async createChat(
    id: string,
    chatPayloadDto: ChatPayloadDto,
  ): Promise<ChatPayload> {
    const { content, mode, participant } = chatPayloadDto;
    participant.push({
      user: id,
      role: 'OWNER',
      stats: 2,
    });
    const chatpayload = await this.chatPayloadModel.create({
      content,
      mode,
      participant,
    });

    return chatpayload;
  }

  async myChats(id: string): Promise<ChatPayload[]> {
    const payloads = await this.chatPayloadModel.find({
      'participant.user': id,
      'participant.stats': 0,
    });

    if (payloads.length == 0) {
      throw new NotFoundException('Chats not found.');
    }

    // payloads.forEach((payload) => {
    //   const mypal = payload.participant.find(
    //     (participant) => (participant.user = id),
    //   );

    //   if (mypal.role !== 'OWNER' && mypal.user !== id) {
    //     mypal.stats = 1;
    //   }
    // });

    return payloads;
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
