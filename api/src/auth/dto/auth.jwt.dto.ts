import { ApiModelProperty } from '@nestjs/swagger';

export class AuthJwtDto {
  @ApiModelProperty()
  access_token: string;

  @ApiModelProperty()
  refresh_token: string;
}
