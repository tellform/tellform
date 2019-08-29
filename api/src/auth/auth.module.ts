import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from "./constants"
import { JwtModule } from "@nestjs/jwt"
import controllers from './auth.controllers'
import providers from './auth.providers'
import { MailModule } from "../mail/mail.module"

@Module({
  imports: [
    UserModule,
    PassportModule,
    MailModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers,
  providers
})
export class AuthModule {}
