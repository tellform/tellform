import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {AuthService} from "../services/auth.service"

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('password'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.createToken(req.user);
  }

  @UseGuards(AuthGuard('jwt.refresh'))
  @Post('refresh')
  async refresh(@Request() req) {
    return this.authService.createToken(req.user);
  }
}
