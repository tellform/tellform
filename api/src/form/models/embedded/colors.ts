import {prop, Ref, Typegoose} from "typegoose"
import {Exclude} from "class-transformer"

export class Colors {
  @Exclude()
  readonly _id: string;

  @prop({
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
    default: '#fff'
  })
  readonly backgroundColor: string;

  @prop({
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
    default: '#333'
  })
  readonly questionColor: string;

  @prop({
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
    default: '#333'
  })
  readonly answerColor: string;

  @prop({
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
    default: '#fff'
  })
  readonly buttonColor: string;

  @prop({
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
    default: '#333'
  })
  readonly buttonTextColor: string;
}
