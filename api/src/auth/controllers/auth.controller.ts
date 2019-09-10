import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "../services/auth.service"
import { AuthJwtDto } from "../dto/auth.jwt.dto"
import {ApiBearerAuth, ApiImplicitBody, ApiImplicitQuery, ApiResponse, ApiUseTags} from "@nestjs/swagger"

@ApiUseTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'Successful login.', type: AuthJwtDto})
  @ApiResponse({ status: 401, description: 'Invalid Credentials.'})
  @ApiImplicitQuery({name: 'username', type: String})
  @ApiImplicitQuery({name: 'password', type: String})
  @UseGuards(AuthGuard('password'))
  @Post('login')
  async login(@Request() req): Promise<AuthJwtDto> {
    return this.authService.createToken(req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Consumed Refresh Token.', type: AuthJwtDto})
  @ApiResponse({ status: 401, description: 'Invalid Token.'})
  @UseGuards(AuthGuard('jwt.refresh'))
  @Post('refresh')
  async refresh(@Request() req): Promise<AuthJwtDto> {
    return this.authService.createToken(req.user);
  }
}
