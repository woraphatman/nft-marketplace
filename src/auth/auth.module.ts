import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports:   [UserModule,PassportModule, 
    JwtModule.register({
    secret: process.env.SECRET,
    signOptions: { expiresIn: '60s' },
  }),],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports: [ AuthService]
})
export class AuthModule {}
