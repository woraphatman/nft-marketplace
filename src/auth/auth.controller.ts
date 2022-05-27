import { Controller, Post, Request,Get, UseGuards } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { LocalAuthGuard } from './local/local.auth.guards';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @UseGuards(LocalAuthGuard)
    @Post ('login')
    async login(@Request()  req:any): Promise<any>{
            return this.authService.login(req.user)
        }
   

@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req:any): Promise<any>{
  return req.user;
}
}
