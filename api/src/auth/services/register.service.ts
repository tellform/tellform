import { Injectable } from "@nestjs/common"
import { MailService } from "../../mail/services/mail.service"
import { User } from "../../user/models/user.model"
import { PasswordService } from "./password.service"
import { UserService } from "../../user/services/user.service"

@Injectable()
export class RegisterService {
  constructor(
    private readonly mailService: MailService,
    private readonly passwordService: PasswordService,
    private readonly userService: UserService
  ) {}

  async register (username: string, email: string, password: string): Promise<void> {
    // TODO actually create user

    let user = new User()
    user.email = email
    user.username = username
    user.passwordHash = await this.passwordService.hash(password)

    await this.userService.save(user)

    await this.mailService.sendEmail(
      {
        template: 'auth/register',
        to: email
      },
      {
        confirm: 'some url'
      }
    )
  }
}
