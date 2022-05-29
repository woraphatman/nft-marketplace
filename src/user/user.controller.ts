import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<User | string> {
    return this.userService.signUp(signUpDto);
  }
}
