import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local/local.auth.guards';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post ('signin')
    signin(@Req()  req): Promise<any>{
            return req.user 
        }
   

}
