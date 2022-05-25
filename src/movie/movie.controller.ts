import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Movie } from 'src/movie/movie.model';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async createMovie(@Res() response, @Body() movie: Movie) {
    const newMovie = await this.movieService.create(movie);
    return response.status(HttpStatus.CREATED).json({
      newMovie,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const movies = await this.movieService.readAll();
    return response.status(HttpStatus.OK).json({
      movies,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const movie = await this.movieService.readById(id);
    return response.status(HttpStatus.OK).json({
      movie,
    });
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() movie: Movie) {
    const updatedMovie = await this.movieService.update(id, movie);
    return response.status(HttpStatus.OK).json({
      updatedMovie,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedMovie = await this.movieService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedMovie,
    });
  }
}
