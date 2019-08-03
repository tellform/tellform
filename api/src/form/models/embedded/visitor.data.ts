import {Exclude} from "class-transformer"
import {arrayProp, prop} from "typegoose"
import {Field} from "./field"
import {Ref} from "typegoose/lib/prop"

export class VisitorData {
  @Exclude()
  readonly _id: string;

  @prop()
  readonly introParagraph: string;

  @prop()
  readonly referrer: string;

  @arrayProp({
    itemsRef: Field
  })
  readonly filledOutFields: Ref<Field>[];

  @prop()
  readonly timeElapsed: number;

  @prop()
  readonly isSubmitted: boolean;

  @prop({
    enum: ['en', 'fr', 'es', 'it', 'de'],
    default: 'en',
  })
  readonly language: string;

  @prop()
  readonly ipAddr: string;

  @prop({
    enum: ['desktop', 'phone', 'tablet', 'other'],
    default: 'other'
  })
  readonly deviceType: string;

  @prop()
  readonly userAgent: string;
}
