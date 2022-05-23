import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from './movie.controller';
import { MovieSchema } from './movie.model';
import { MovieService } from './movie.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Movie', schema: MovieSchema}])],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}
