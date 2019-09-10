import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "../services/auth.service"
import { AuthJwtDto } from "../dto/auth.jwt.dto"
import {ApiBearerAuth, ApiImplicitBody, ApiImplicitQuery, ApiResponse, ApiUseTags} from "@nestjs/swagger"

@ApiUseTags('authentication')
@Controller('auth/recover')
export class RecoverController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'Successful registration.', type: AuthJwtDto})
  @ApiImplicitQuery({name: 'email', type: String})
  @ApiImplicitQuery({name: 'username', type: String})
  @Post('request')
  async request(@Request() req): Promise<AuthJwtDto> {
    // TODO
    return null
  }

  @ApiResponse({ status: 201, description: 'Successful registration.', type: AuthJwtDto})
  @ApiImplicitQuery({name: 'token', type: String})
  @ApiImplicitQuery({name: 'password', type: String})
  @Post('finish')
  async finish(@Request() req): Promise<AuthJwtDto> {
    // TODO
    return null
  }
}
