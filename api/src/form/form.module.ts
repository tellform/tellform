import { Module } from '@nestjs/common';
import controllers from './form.controllers';
import providers from './form.providers'
import {TypegooseModule} from "nestjs-typegoose"
import {Form} from "./models/form.model"

@Module({
  imports: [
    TypegooseModule.forFeature([Form]),
  ],
  exports: [],
  controllers,
  providers,
})
export class FormModule {}
