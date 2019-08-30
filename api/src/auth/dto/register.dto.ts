import { ApiModelProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, Validate } from "class-validator"
import { UsernameAlreadyInUse } from "../../user/validators/UsernameAlreadyInUse"
import { EmailAlreadyInUse } from "../../user/validators/EmailAlreadyInUse"

export class RegisterDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @Validate(UsernameAlreadyInUse)
  readonly username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiModelProperty()
  @Validate(EmailAlreadyInUse)
  @IsEmail()
  readonly email: string;
}
