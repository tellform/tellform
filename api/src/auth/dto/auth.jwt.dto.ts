import { ApiModelProperty } from '@nestjs/swagger';

export class AuthJwtDto {
  @ApiModelProperty()
  token: {
    accessToken: string;

    refreshToken: string;
  }
}
