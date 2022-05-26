import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneUser(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log(result)
      return result;
    }
    return null;
  }
}