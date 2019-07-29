import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { PasswordStrategy } from "./strategies/password.strategy"
import { PasswordService } from "./services/password.service"
import { AuthController } from "./controllers/auth.controller"
import { jwtConstants } from "./constants"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { JwtRefreshStrategy } from "./strategies/jwt.refresh.strategy"

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    PasswordStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ]
})
export class AuthModule {}
