import {prop} from "typegoose"
import {Exclude} from "class-transformer"

export class RespondentNotifications {
  @Exclude()
  readonly _id: string;

  @prop()
  readonly toField: string;

  @prop({
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  })
  readonly fromEmails: string;

  @prop({
    default: 'OhMyForm: Thank you for filling out this OhMyForm'
  })
  readonly subject: string;

  @prop({
    default: 'Hello, <br><br> We’ve received your submission. <br><br> Thank you & have a nice day!',
  })
  readonly htmlTemplate: string;

  @prop({
    default: false
  })
  readonly enabled: boolean;
}
