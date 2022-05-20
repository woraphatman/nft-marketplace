import { Controller, Get, Req ,Post,HttpCode} from '@nestjs/common';
import { Request } from 'express';

@Controller('controllers')
export class ControllersController {
    @Post()
    @HttpCode(204)
    create() {
      return 'This action adds a new cat';
    }
    @Get()
    findAll(@Req() request: Request): string {
      return 'This action returns all cats';
    }
}