import { Injectable, NotFoundException } from '@nestjs/common';
import { OptionsDto } from "../dto/options.dto"

@Injectable()
export class MailService {
  // TODO
  async sendEmail(options:OptionsDto, placeholders:any): Promise<boolean> {
    return false
  }
}
