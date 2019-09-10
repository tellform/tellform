import {Exclude} from "class-transformer"
import {prop} from "typegoose"

export class Button {
  @Exclude()
  readonly _id: string;

  @prop({
    match: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  })
  url: string;

  @prop()
  action: string;

  @prop()
  text: string;

  @prop({
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
    default: '#5bc0de'
  })
  bgColor: string;

  @prop({
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
    default: '#ffffff'
  })
  color: string;
}
