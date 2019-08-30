import { ValidationArguments, ValidatorConstraint } from "class-validator"
import { Inject, Injectable } from "@nestjs/common"
import { UserService } from "../services/user.service"

@ValidatorConstraint({ name: 'EmailAlreadyInUse', async: true })
@Injectable()
export class EmailAlreadyInUse {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
  ) {}

  async validate(text: string) {
    const user = await this.userService.findOneBy({email: text});
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'User with this email already exists.';
  }
}
