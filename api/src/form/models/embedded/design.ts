import {prop} from "typegoose"
import {Colors} from "./colors"
import {Exclude} from "class-transformer"

export class Design {
  @Exclude()
  readonly _id: string;

  @prop()
  readonly colors: Colors;

  @prop()
  readonly font: string;
}
