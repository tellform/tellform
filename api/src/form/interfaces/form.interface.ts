import { Document } from 'mongoose';
import { Field } from "./field.interface"
import { Button } from "./button.interface"

export class Form extends Document{
  readonly firstName: string;
  readonly language: string;
  readonly analytics: string;
  readonly form_fields: Field[];
  readonly admin: any;
  readonly startPage: {
    readonly showStart: boolean;
    readonly introTitle: string;
    readonly introParagraph: string;
    readonly introButtonText: string;
    readonly buttons: Button[];
  };
  readonly endPage: {
    readonly showEnd: boolean;
    readonly title: string;
    readonly paragraph: string;
    readonly buttonText: string;
    readonly buttons: Button[];
  };
  readonly selfNotifications: {
    readonly fromField: string;
    readonly toEmails: string;
    readonly subject: string;
    readonly htmlTemplate: string;
    readonly enabled: boolean;
  };
  readonly respondentNotifications: {
    readonly toField: string;
    readonly fromEmails: string;
    readonly subject: string;
    readonly htmlTemplate: string;
    readonly enabled: boolean;
  };
  readonly showFooter: boolean;
  readonly isLive: boolean;
  readonly design: {
    readonly colors: {
      readonly backgroundColor: string;
      readonly questionColor: string;
      readonly answerColor: string;
      readonly buttonColor: string;
      readonly buttonTextColor: string;
    };
    readonly font: string;
  };
}
