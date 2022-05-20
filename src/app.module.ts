import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersController } from './controllers/controllers.controller';

@Module({
  imports: [],
  controllers: [AppController, ControllersController],
  providers: [AppService],
})
export class AppModule {}
