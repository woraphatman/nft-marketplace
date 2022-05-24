import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument, ImageSchema } from './uploads.model';

@Injectable()
export class UploadsService {
      constructor(@InjectModel("image") private imageModel: Model<ImageDocument>) {}

   async create(image: Image): Promise<Image> {
     const creatednew = new this.imageModel(image);
     return creatednew.save();
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
