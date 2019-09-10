import { ValidationArguments, ValidatorConstraint } from "class-validator"
import { Inject, Injectable } from "@nestjs/common"
import { UserService } from "../services/user.service"

@ValidatorConstraint({ name: 'UsernameAlreadyInUse', async: true })
@Injectable()
export class UsernameAlreadyInUse {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
  ) {}

  async validate(text: string) {
    const user = await this.userService.findOneBy({username: text});
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'User with this username already exists.';
  }
}
