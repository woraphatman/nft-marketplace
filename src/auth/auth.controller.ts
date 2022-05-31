import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';
import { Userdto } from 'src/user/dto/user.dto';
import { GetUser } from 'src/user/user.decorator';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { LocalAuthGuard } from './local/local.auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@GetUser() user: Userdto) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user: Userdto) {
    return user;
  }
}
