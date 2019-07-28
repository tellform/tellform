import * as mongoose from 'mongoose';
import {VisitorDataSchema} from "./visitor.data.schema"
import {ButtonSchema} from "./button.schema"
import {FieldSchema} from "./field.schema"

export const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Form Title cannot be blank'
  },
  language: {
    type: String,
    enum: ['en', 'fr', 'es', 'it', 'de'],
    default: 'en',
    required: 'Form must have a language'
  },
  analytics:{
    gaCode: {
      type: String
    },
    visitors: [VisitorDataSchema]
  },
  form_fields: {
    type: [FieldSchema],
    default: []
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Form must have an Admin'
  },
  startPage: {
    showStart:{
      type: Boolean,
      default: false
    },
    introTitle:{
      type: String,
      default: 'Welcome to Form'
    },
    introParagraph:{
      type: String
    },
    introButtonText:{
      type: String,
      default: 'Start'
    },
    buttons:[ButtonSchema]
  },
  endPage: {
    showEnd:{
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default: 'Thank you for filling out the form'
    },
    paragraph:{
      type: String
    },
    buttonText:{
      type: String,
      default: 'Go back to Form'
    },
    buttons:[ButtonSchema]
  },

  selfNotifications: {
    fromField: {
      type: String
    },
    toEmails: {
      type: String
    },
    subject: {
      type: String
    },
    htmlTemplate: {
      type: String
    },
    enabled: {
      type: Boolean,
      default: false
    }
  },

  respondentNotifications: {
    toField: {
      type: String
    },
    fromEmails: {
      type: String,
      match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    subject: {
      type: String,
      default: 'OhMyForm: Thank you for filling out this OhMyForm'
    },
    htmlTemplate: {
      type: String,
      default: 'Hello, <br><br> We’ve received your submission. <br><br> Thank you & have a nice day!',
    },
    enabled: {
      type: Boolean,
      default: false
    }
  },

  showFooter: {
    type: Boolean,
    default: true
  },

  isLive: {
    type: Boolean,
    default: true
  },

  design: {
    colors: {
      backgroundColor: {
        type: String,
        match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
        default: '#fff'
      },
      questionColor: {
        type: String,
        match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
        default: '#333'
      },
      answerColor: {
        type: String,
        match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
        default: '#333'
      },
      buttonColor: {
        type: String,
        match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
        default: '#fff'
      },
      buttonTextColor: {
        type: String,
        match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
        default: '#333'
      }
    },
    font: String
  }
});
