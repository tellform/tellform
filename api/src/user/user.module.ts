import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import providers from './user.providers'
import exportList from './user.exports'
import { User } from "./models/user.model"
import controllers from './user.controllers'

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
  ],
  controllers,
  providers,
  exports: exportList,
})
export class UserModule {}
