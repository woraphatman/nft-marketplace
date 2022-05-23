import {  Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,  } from '@nestjs/common';
    import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}
  
    @Post()
    async addMovie(
      @Body('name') movieName: string,
      @Body('description') movieDesc: string,
      @Body('Image') movieImage: String,
    ) {
      const generatedId = await this.movieService.insertMovie(
        movieName,
        movieDesc,
        movieImage,
      );
      return { id: generatedId };
    }
  
    @Get()
    async getAllMovie() {
      const movies = await this.movieService.getMovies();
      return movies;
    }
  
    @Get(':id')
    getMovie(@Param('id') movieId: string) {
      return this.movieService.getSingleMovie(movieId);
    }
  
    @Patch(':id')
    async updateMovie(
      @Param('id') movieId: string,
      @Body('name') movieName: string,
      @Body('description') movieDesc: string,
      @Body('Image') movieImage: String,
    ) {
      await this.movieService.updateMovie(movieId, movieName, movieDesc, movieImage);
      return null;
    }
  
    @Delete(':id')
    async removeMovie(@Param('id') movieId: string) {
        await this.movieService.deleteMovie(movieId);
        return null;
    }
  }


    
