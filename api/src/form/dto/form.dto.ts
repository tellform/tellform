import { ApiModelProperty } from '@nestjs/swagger';
import { Form } from "../models/form.model"

export class FormDto {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  title: string;

  @ApiModelProperty()
  live: boolean;

  @ApiModelProperty()
  created: Date;

  @ApiModelProperty()
  lastModified: Date;

  @ApiModelProperty()
  fields: any;

  @ApiModelProperty()
  info: {
    responses: number;
  }

  constructor(partial: Partial<Form>) {
    this.id = partial._id.toString()
    this.title = partial.title
    this.live = partial.isLive
    this.created = partial.created
    this.lastModified = partial.lastModified
    this.fields = partial.form_fields
    this.info = {
      responses: 0 // TODO
    }
  }
}
