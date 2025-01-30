import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthModule } from 'src/auth/auth.module';
import * as fs from 'fs';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const directory = `./uploads/${req.headers.branch}`;

          if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
          }

          cb(null, directory);
        },
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith('image/')) {
          return callback(new Error('Only images are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
