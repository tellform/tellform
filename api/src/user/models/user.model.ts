import {arrayProp, pre, prop, Typegoose} from 'typegoose';
import { IsString } from 'class-validator';
import {Exclude} from "class-transformer"

@pre<User>('save', (next) => {
  this.lastModified = new Date()
  next()
})
export class User extends Typegoose {
  @Exclude()
  readonly _id: string;

  @prop({
    trim: true,
    default: ''
  })
  firstName: string;

  @prop({
    trim: true,
    default: ''
  })
  lastName: string;

  @prop({
    trim: true,
    lowercase: true,
    unique: true, // 'Account already exists with this email',
    match: [
      /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please fill a valid email address'
    ],
    required: [true, 'Email is required']
  })
  email: string;

  @prop({
    unique: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9\-]+$/,
      'Username can only contain alphanumeric characters and \'-\''
    ],
    required: [true, 'Username is required']
  })
  username: string;

  @prop({
    default: ''
  })
  passwordHash: string;

  @prop()
  salt: string;

  @prop({
    default: 'local'
  })
  provider: string;

  @arrayProp({
    items: String,
    enum: ['user', 'admin', 'superuser'],
    default: ['user']
  })
  roles: [string];

  @prop({
    enum: ['en', 'fr', 'es', 'it', 'de'],
    default: 'en',
  })
  language: string;

  @prop({
    default: Date.now
  })
  readonly created: Date;

  @prop()
  readonly lastModified: Date;

  @prop()
  resetPasswordToken: string;

  @prop()
  resetPasswordExpires: Date;

  @prop()
  token: string;

  @prop({
    unique: true,
    index: true,
    sparse: true
  })
  apiKey: string;
}
