import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { MovieService } from './movie/movie.service';
import { UploadsModule } from './uploads/uploads.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MovieModule,
    UploadsModule,
    UserModule,
    AuthModule
  ],
  
})
export class AppModule {}
