import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './uploads.model';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Image", schema: ImageSchema }]),
    MulterModule.register({
      dest: './src/uploads/files',
    }),
  ],
  providers: [UploadsService],
  controllers: [UploadsController],
})
export class UploadsModule {}
