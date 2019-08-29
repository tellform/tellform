import {Controller, Request, Get, Post, Put, Delete, UseGuards, Param, NotImplementedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiImplicitQuery, ApiResponse, ApiUseTags } from "@nestjs/swagger"
import { UserService } from "../services/user.service"
import { UserDto } from "../dto/user.dto"

@ApiUseTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async list(@Request() req): Promise<any> {
    throw new NotImplementedException()
  }

  @ApiResponse({ status: 200, description: 'User Object', type: UserDto})
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req): Promise<UserDto> {
    throw new NotImplementedException()
  }

  @ApiResponse({ status: 200, description: 'User Object', type: UserDto})
  @ApiImplicitQuery({name: 'id', type: String})
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async read(@Param('id') id): Promise<UserDto> {
    return new UserDto(await this.userService.findById(id));
  }

  @ApiResponse({ status: 200, description: 'User Object', type: UserDto})
  @ApiImplicitQuery({name: 'id', type: String})
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id, @Request() req): Promise<UserDto> {
    throw new NotImplementedException()
  }


  @ApiResponse({ status: 200, description: 'User Object', type: UserDto})
  @ApiImplicitQuery({name: 'id', type: String})
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id): Promise<void> {
    throw new NotImplementedException()
  }
}
