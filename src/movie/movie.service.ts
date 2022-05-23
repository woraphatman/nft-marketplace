import { Injectable,NotFoundException } from '@nestjs/common';
import { Movie } from './movie.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MovieService {
    constructor(@InjectModel('Movie') private readonly movieModel: Model<Movie>) {}

    async insertMovie(name: string,desc: string, image: string){
        const newMovie = new this.movieModel({
            name,
            description: desc,
            image
        });
        const result = await newMovie.save();
        console.log(result);
        return result.id;
    }
    
    async getMovies() {
        const movies = await this.movieModel.find().exec();
    return movies.map(movie => ({
      id: movie.id,
      name: movie.name,
      description: movie.description,
      image: movie.image,
    }));
  }
  async updateMovie(
   movieId: string,
    name: string,
    desc: string,
    image: string,
  ) {
    const updatedMovie = await this.findMovie(movieId);
    if (name) {
      updatedMovie.name = name;
    }
    if (desc) {
      updatedMovie.description = desc;
    }
    if (image) {
      updatedMovie.image = image;
    }
    updatedMovie.save();
  }

  async deleteMovie(prodId: string) {
    const result = await this.movieModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find movie.');
    }
  }

  private async findMovie(id: string): Promise<Movie> {
    let movie;
    try {
      movie = await this.movieModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find movie.');
    }
    if (!movie) {
      throw new NotFoundException('Could not find movie.');
    }
    return movie;
  }
}