import { Injectable } from "@nestjs/common"
import { MailService } from "../../mail/services/mail.service"

@Injectable()
export class RegisterService {
  constructor(private readonly mailService: MailService) {}

  async register (username: string, email: string, password: string): Promise<void> {
    // TODO actually create user

    await this.mailService.sendEmail(
      {
        template: 'auth/register.hbs',
        to: email
      },
      {
        confirm: 'some url'
      }
    )
  }
}
