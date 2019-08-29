import { ApiModelProperty } from '@nestjs/swagger';
import { Form } from "../models/form.model"

export class FormDto {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  title: string;

  fields: [];

  constructor(partial: Partial<Form>) {
    this.id = partial._id.toString();
    this.title = partial.title
  }
}
