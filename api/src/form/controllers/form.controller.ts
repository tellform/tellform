import {Controller, Request, Get, Post, Put, Delete, UseGuards, Param, NotImplementedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiImplicitQuery, ApiResponse, ApiUseTags } from "@nestjs/swagger"
import { FormService } from "../services/form.service"
import { FormDto } from "../dto/form.dto"

@ApiUseTags('forms')
@ApiBearerAuth()
@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async list(@Request() req): Promise<any> {
    throw new NotImplementedException()
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req): Promise<FormDto> {
    throw new NotImplementedException()
  }

  @ApiResponse({ status: 200, description: 'Form Object', type: FormDto})
  @ApiImplicitQuery({name: 'id', type: String})
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async read(@Param('id') id): Promise<FormDto> {
    return new FormDto(await this.formService.findById(id));
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id, @Request() req): Promise<FormDto> {
    throw new NotImplementedException()
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id): Promise<void> {
    throw new NotImplementedException()
  }
}
