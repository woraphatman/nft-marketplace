import { Injectable } from '@nestjs/common';
import { Movie, MovieDocument } from './movie.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MovieService {
    constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}
    
    async create(movie: Movie): Promise<Movie> {
        const newMovie = new this.movieModel(movie);
        return newMovie.save();
    }

    async readAll(): Promise<Movie[]> {
        return await this.movieModel.find().exec();
    }

    async readById(id): Promise<Movie> {
        return await this.movieModel.findById(id).exec();
    }

    async update(id, movie: Movie): Promise<Movie> {
        return await this.movieModel.findByIdAndUpdate(id, movie, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.movieModel.findByIdAndRemove(id);
    }
       
}
