import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "../services/auth.service"
import { AuthJwtDto } from "../dto/auth.jwt.dto"
import {ApiBearerAuth, ApiImplicitBody, ApiImplicitQuery, ApiResponse, ApiUseTags} from "@nestjs/swagger"

@ApiUseTags('authentication')
@Controller('auth')
export class RegisterController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'Successful registration.', type: AuthJwtDto})
  @ApiImplicitQuery({name: 'email', type: String})
  @ApiImplicitQuery({name: 'username', type: String})
  @ApiImplicitQuery({name: 'password', type: String})
  @Post('register')
  async register(@Request() req): Promise<AuthJwtDto> {
    // TODO
    return null
  }
}
