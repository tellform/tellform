import {Controller, Request, Get, Post, Put, Delete, UseGuards, Param, NotImplementedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiImplicitQuery, ApiResponse, ApiUseTags } from "@nestjs/swagger"
import { UserService } from "../services/user.service"
import { UserDto } from "../dto/user.dto"
import { FindOneDto } from "../../core/dto/find.one.dto"

@ApiUseTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async list(@Request() req): Promise<UserDto[]> {
    // TODO calculate total forms, add for pagination
    const results = await this.userService.findBy({})
    return results.map(form => new UserDto(form))
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
  async read(@Param() params: FindOneDto): Promise<UserDto> {
    return new UserDto(await this.userService.findById(params.id));
  }

  @ApiResponse({ status: 200, description: 'User Object', type: UserDto})
  @ApiImplicitQuery({name: 'id', type: String})
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param() params: FindOneDto, @Request() req): Promise<UserDto> {
    throw new NotImplementedException()
  }


  @ApiResponse({ status: 200, description: 'User Object', type: UserDto})
  @ApiImplicitQuery({name: 'id', type: String})
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param() params: FindOneDto): Promise<void> {
    throw new NotImplementedException()
  }
}
