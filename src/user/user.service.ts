import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async signUp(signupUpDto: SignUpDto): Promise<User> {
    try {
      const { username, password } = signupUpDto;

      const hashedPassword = await bcrypt.hashSync(password, 10);

      const user = this.userModel.create({
        username,
        password: hashedPassword,
      });
      const creatednew = new this.userModel(user);
    return creatednew.save();
      
    } catch (e) {
      throw new ConflictException({
        message: ['Username has been already using.'],
      });
    }
  }

  async findOneUser(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
