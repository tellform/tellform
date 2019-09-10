import {prop} from "typegoose"
import {Button} from "./button"
import {Exclude} from "class-transformer"

export class EndPage {
  @Exclude()
  readonly _id: string;

  @prop({
    default: false
  })
  readonly showEnd: boolean;

  @prop({
    default: 'Thank you for filling out the form'
  })
  readonly title: string;

  @prop()
  readonly paragraph: string;

  @prop({
    default: 'Go back to Form'
  })
  readonly buttonText: string;

  @prop()
  readonly buttons: Button[];
}
