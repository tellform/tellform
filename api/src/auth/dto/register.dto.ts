import { ApiModelProperty } from "@nestjs/swagger"

export class RegisterDto {
  @ApiModelProperty()
  readonly username: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly email: string;
}
