import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async handleFileUpload(file: Express.Multer.File, id: string) {
    if (!file) {
      throw new BadRequestException('no file uploaded');
    }

    // validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('invalid file type');
    }

    // validate file size (e.g., max 5mb)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('file is too large!');
    }

    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        'profile.image': file.path,
      },
      {
        new: true,
      },
    );

    return {
      message: 'File uploaded successfully',
      filePath: file.path,
      id: user,
    };
  }
}
