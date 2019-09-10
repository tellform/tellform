import {Controller, Request, Get, Post, Put, Delete, UseGuards, Param, NotImplementedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiImplicitQuery, ApiResponse, ApiUseTags } from "@nestjs/swagger"
import { FormService } from "../services/form.service"
import { FormDto } from "../dto/form.dto"
import { FindOneDto } from "../../core/dto/find.one.dto"

@ApiUseTags('forms')
@ApiBearerAuth()
@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async list(@Request() req): Promise<FormDto[]> {
    // TODO calculate total forms, add for pagination
    const results = await this.formService.findBy({})
    return results.map(form => new FormDto(form))
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
  async read(@Param() params: FindOneDto): Promise<FormDto> {
    return new FormDto(await this.formService.findById(params.id));
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param() params: FindOneDto, @Request() req): Promise<FormDto> {
    throw new NotImplementedException()
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param() params: FindOneDto): Promise<void> {
    throw new NotImplementedException()
  }
}
