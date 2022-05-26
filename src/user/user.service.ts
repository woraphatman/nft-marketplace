import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async signUp(signUpDto: SignUpDto): Promise<User> {
      const hashedPassword = bcrypt.hashSync(signUpDto.password, 10);
      const creatednew = new this.userModel({username: signUpDto.username , password: hashedPassword});
    return creatednew.save();
  }

  async findOneUser(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
