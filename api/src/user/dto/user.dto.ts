import { ApiModelProperty } from '@nestjs/swagger';
import {User} from "../models/user.model"

export class UserDto {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  username: string;

  constructor(partial: Partial<User>) {
    this.id = partial._id.toString();
    this.username = partial.username
  }
}
