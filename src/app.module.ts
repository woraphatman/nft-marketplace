import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { AppService } from './app.service';
import { MovieController } from './movie/movie.controller';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [MovieModule,MongooseModule.forRoot("mongodb+srv://man:1234@cluster0.dmuor.mongodb.net/Movies?retryWrites=true&w=majority")],
  controllers: [MovieController],
  providers: [AppService],
})
export class AppModule {}
