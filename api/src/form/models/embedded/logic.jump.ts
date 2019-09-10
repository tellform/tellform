import {prop, Ref} from "typegoose"
import {VisitorData} from "./visitor.data"
import {Exclude} from "class-transformer"
import {Field} from "./field"

export class LogicJump {
  @Exclude()
  readonly _id: string;

  @prop({
    enum: [
      'field == static',
      'field != static',
      'field > static',
      'field >= static',
      'field <= static',
      'field < static',
      'field contains static',
      'field !contains static',
      'field begins static',
      'field !begins static',
      'field ends static',
      'field !ends static'
    ]
  })
  expressionString: string;

  @prop({
    ref: Field
  })
  fieldA: Ref<Field>;

  @prop()
  valueB: string;

  @prop({
    ref: Field
  })
  jumpTo: Ref<Field>;

  @prop({
    default: false
  })
  enabled: boolean;
}
