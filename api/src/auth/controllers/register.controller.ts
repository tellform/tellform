import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from "../services/auth.service"
import { ApiBadRequestResponse, ApiCreatedResponse, ApiUseTags } from "@nestjs/swagger"
import { RegisterDto } from "../dto/register.dto"
import {RegisterService} from "../services/register.service"

@ApiUseTags('authentication')
@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @ApiCreatedResponse({ description: 'Successful registration.'})
  @ApiBadRequestResponse({})
  @Post('register')
  async register(@Body() params: RegisterDto): Promise<void> {
    await this.registerService.register(params.username, params.email, params.password)
  }
}
