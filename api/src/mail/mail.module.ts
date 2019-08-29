import { Module } from '@nestjs/common';
import providers from './mail.providers'
import exportList from './mail.exports'

@Module({
  imports: [],
  providers,
  exports: exportList,
})
export class MailModule {}
