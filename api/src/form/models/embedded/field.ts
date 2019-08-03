import {arrayProp, prop} from "typegoose"
import {LogicJump} from "./logic.jump"
import {RatingField} from "./rating.field"
import {FieldOption} from "./field.option"
import {Exclude} from "class-transformer"

export class Field {
  @Exclude()
  readonly _id: string;

  @prop({
    default: false
  })
  isSubmission: boolean;

  @prop()
  submissionId: string;

  @prop({
    trim: true
  })
  title: string;

  @prop({
    default: ''
  })
  description: string;

  @prop()
  logicJump: LogicJump;

  @prop()
  ratingOptions: RatingField;

  @arrayProp({
    items: FieldOption
  })
  fieldOptions: FieldOption[];

  @prop({
    default: true
  })
  required: boolean;

  @prop({
    default: false
  })
  disabled: boolean;

  @prop({
    default: false
  })
  deletePreserved: boolean;

  @arrayProp({
    items: String
  })
  validFieldTypes: boolean;

  @prop({
    enum: [
      'textfield',
      'date',
      'email',
      'legal',
      'textarea',
      'link',
      'statement',
      'dropdown',
      'rating',
      'radio',
      'hidden',
      'yes_no',
      'number'
    ]
  })
  fieldType: string;

  @prop({
    default: ''
  })
  fieldValue: any;
}
