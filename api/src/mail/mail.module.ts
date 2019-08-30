import { Module } from '@nestjs/common';
import providers from './mail.providers'
import exportList from './mail.exports'
import { HandlebarsAdapter, MailerModule } from "@nest-modules/mailer"

@Module({
  imports: [
  ],
  providers,
  exports: exportList,
})
export class MailModule {}
