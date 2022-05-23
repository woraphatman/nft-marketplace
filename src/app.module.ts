import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MovieController } from './movie/movie.controller';
import { Movie, MovieSchema } from './movie/movie.model';
import { MovieService } from './movie/movie.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env']
    }),
    MulterModule.register({
    dest: './src/uploads/files',
  }),
    Movie,MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{name: 'Movie', schema: MovieSchema}])],
  providers: [MovieService,],
  controllers: [MovieController,]

})
export class AppModule {}
