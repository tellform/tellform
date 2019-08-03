import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import providers from './user.providers'
import exportList from './user.exports'
import { User } from "./models/user.model"

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
  ],
  providers,
  exports: exportList,
})
export class UserModule {}
