import {Controller, Request, Get, Post, Put, Delete, UseGuards, Param} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from "@nestjs/swagger"
import { FormService } from "../services/form.service"
import {Form} from "../models/form.model"

@ApiUseTags('forms')
@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async list(@Request() req): Promise<any> {
    return true;
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req): Promise<Form> {
    return null;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async read(@Param('id') id): Promise<Form> {
    return this.formService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id, @Request() req): Promise<Form> {
    return this.formService.findById(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id): Promise<void> {
  }
}
