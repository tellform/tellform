import * as mongoose from 'mongoose';
import {RatingFieldSchema} from "./rating.field.schema"
import {FieldOptionSchema} from "./field.option.schema"
import {LogicJumpSchema} from "./logic.jump.schema"

export const FieldSchema = new mongoose.Schema({
  isSubmission: {
    type: Boolean,
    default: false
  },
  submissionId: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },

  logicJump: LogicJumpSchema,

  ratingOptions: RatingFieldSchema,
  fieldOptions: [FieldOptionSchema],

  required: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },

  deletePreserved: {
    type: Boolean,
    default: false
  },
  validFieldTypes: {
    type: [String]
  },
  fieldType: {
    type: String,
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
  },
  fieldValue: {
    type: mongoose.Schema.Types.Mixed,
    default: ''
  }
});
