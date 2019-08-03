import {prop} from "typegoose"
import {VisitorData} from "./visitor.data"
import {Exclude} from "class-transformer"

export class Analytics {
  @Exclude()
  readonly _id: string;

  @prop()
  gaCode: string;

  @prop()
  visitors: VisitorData[]
}
