import { ApiModelProperty } from '@nestjs/swagger';
import {User} from "../models/user.model"

export class UserDto {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  roles: string[];

  @ApiModelProperty()
  created: Date;

  constructor(partial: Partial<User>) {
    this.id = partial._id.toString()
    this.username = partial.username
    this.email = partial.email
    this.roles = partial.roles
    this.created = partial.created
  }
}
