import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneUser(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }
  async login(user: any) {
    console.log(user);
    const payload = { username: user._doc.username, sub: user._doc._id };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET,
      }),
    };
  }
}
