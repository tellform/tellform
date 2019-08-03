import {prop, Ref, Typegoose} from "typegoose"
import {Analytics} from "./embedded/analytics"
import {Field} from "./embedded/field"
import {StartPage} from "./embedded/start.page"
import {EndPage} from "./embedded/end.page"
import {SelfNotifications} from "./embedded/self.notifications"
import {RespondentNotifications} from "./embedded/respondent.notifications"
import {Design} from "./embedded/design"
import {User} from "../../user/models/user.model"

export class Form extends Typegoose{
  @prop({
    trim: true,
    required: 'Form Title cannot be blank'
  })
  readonly firstName: string;

  @prop({
    enum: ['en', 'fr', 'es', 'it', 'de'],
    default: 'en',
    required: 'Form must have a language'
  })
  readonly language: string;

  @prop()
  readonly analytics: Analytics;

  @prop({
    default: []
  })
  readonly form_fields: Field[];

  @prop({
    ref: User,
    required: 'Form must have an Admin'
  })
  readonly admin: Ref<User>;

  @prop()
  readonly startPage: StartPage;

  @prop()
  readonly endPage: EndPage;

  @prop()
  readonly selfNotifications: SelfNotifications;

  @prop()
  readonly respondentNotifications: RespondentNotifications;

  @prop({
    default: true
  })
  readonly showFooter: boolean;

  @prop({
    default: true
  })
  readonly isLive: boolean;

  @prop()
  readonly design: Design;
}
