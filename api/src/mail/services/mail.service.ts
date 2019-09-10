import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import { OptionsDto } from "../dto/options.dto"
import { MailerService } from '@nest-modules/mailer';
import * as Handlebars from 'handlebars'
import * as fs from 'fs';

@Injectable()
export class MailService {
  constructor(
    private readonly nodeMailer: MailerService
  ) {}

  async sendEmail(options:OptionsDto, placeholders:any): Promise<boolean> {
    const template = fs.readFileSync(`${__dirname}/../../../views/en/mail/${options.template}.hbs`, 'UTF-8');

    const parts = Handlebars
      .compile(template)
      (placeholders)
      .split('---')

    const mail:any = {
      to: options.to,
      subject: parts[0],
      text: parts[1],
    }

    if (parts.length > 2) {
      mail.html = parts[2]
    }

    await this.nodeMailer.sendMail(mail)

    return false
  }
}
