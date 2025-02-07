import {
  Controller,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Body,
  Patch,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('file-upload')
@ApiHeader({
  name: 'Branch',
  description: 'File directory',
  required: true,
})
@ApiBearerAuth('Authorization')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Put('upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.fileUploadService.handleFileUpload(file, req.user._id);
  }
}
