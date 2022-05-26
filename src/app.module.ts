import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MovieController } from './movie/movie.controller';
import { MovieSchema } from './movie/movie.model';
import { MovieModule } from './movie/movie.module';
import { MovieService } from './movie/movie.service';
import { UploadsController } from './uploads/uploads.controller';
import { UploadsModule } from './uploads/uploads.module';
import { UploadsService } from './uploads/uploads.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MovieModule,
    UploadsModule,
    UserModule
  ],
  
})
export class AppModule {}
