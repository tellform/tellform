import {prop} from "typegoose"
import {VisitorData} from "./visitor.data"
import {Exclude} from "class-transformer"

export class FieldOption {
  @Exclude()
  readonly _id: string;

  @prop()
  option_id: number;

  @prop()
  option_title: string;

  @prop({
    trim: true
  })
  option_value: string;
}
