import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiImplicitQuery, ApiResponse, ApiUseTags } from "@nestjs/swagger"
import { FormService } from "../services/form.service"
import { Form } from "../models/form.model"
import { PublicFormDto } from "../dto/public.form.dto"
import { FindOneDto } from "../../core/dto/find.one.dto"

@ApiUseTags('forms')
@Controller('public')
export class PublicController {
  constructor(private readonly formService: FormService) {}

  @ApiResponse({ status: 200, description: 'Form Object', type: PublicFormDto})
  @ApiImplicitQuery({name: 'id', type: String})
  @Get(':id')
  async read(@Param() params: FindOneDto): Promise<PublicFormDto> {
    const form:Form = await this.formService.findById(params.id)

    if (!form.isLive) {
      throw new NotFoundException();
    }

    return new PublicFormDto(form);
  }
}
