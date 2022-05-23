import { Injectable,NotFoundException } from '@nestjs/common';
import { Movie, MovieDocument } from './movie.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { extname } from 'path';
import { Image } from 'src/uploads/files.model';

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

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
 
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};