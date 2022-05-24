import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Image } from "./uploads.model";
import { editFileName , imageFileFilter, UploadsService  } from './uploads.service';


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
    async uploadedFile(@UploadedFile() file, @Body() image: Image) {
      const newimage = await this.uploadsService.create(image);
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
    async uploadMultipleFiles(@UploadedFiles() files) {
      console.log(files)
      
      const response = [];
      files.forEach(file => {
        const fileReponse = {
          files,
          
        };
        response.push(fileReponse);
      });
      return response;
      
    }
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './src/uploads/files' });
  }
      
}
