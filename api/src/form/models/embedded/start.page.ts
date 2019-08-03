import {prop} from "typegoose"
import {Button} from "./button"
import {Exclude} from "class-transformer"

export class StartPage {
  @Exclude()
  readonly _id: string;

  @prop({
    default: false
  })
  readonly showStart: boolean;

  @prop({
    default: 'Welcome to Form'
  })
  readonly introTitle: string;

  @prop()
  readonly introParagraph: string;

  @prop({
    default: 'Start'
  })
  readonly introButtonText: string;

  @prop()
  readonly buttons: Button[];
}
