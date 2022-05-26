import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { 
  editFileName,
  imageFileFilter,
  UploadsService,
} from './uploads.service';

@Controller('uploaded')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/uploads/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file, ) {
    const newimage = await this.uploadsService.create(file);
    return newimage
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './src/uploads/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files,) {
    console.log(files);
    const newimages = await this.uploadsService.create(files);
   
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        files,
      };
      response.push(fileReponse);
    });
    return response
    newimages
  }
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './src/uploads/files' });
  }
}
