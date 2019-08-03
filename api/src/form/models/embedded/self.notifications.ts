import {prop} from "typegoose"
import {Exclude} from "class-transformer"

export class SelfNotifications {
  @Exclude()
  readonly _id: string;

  @prop()
  readonly fromField: string;

  @prop()
  readonly toEmails: string;

  @prop()
  readonly subject: string;

  @prop()
  readonly htmlTemplate: string;

  @prop({
    default: false
  })
  readonly enabled: boolean;
}
