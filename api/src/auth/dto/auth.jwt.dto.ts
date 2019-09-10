import { ApiModelProperty } from '@nestjs/swagger';

export class AuthJwtDto {
  @ApiModelProperty()
  accessToken: string;

  @ApiModelProperty()
  refreshToken: string;
}
