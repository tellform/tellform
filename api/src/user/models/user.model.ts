import {arrayProp, prop, Typegoose} from 'typegoose';
import { IsString } from 'class-validator';
import {Exclude} from "class-transformer"

export class User extends Typegoose {
  @Exclude()
  readonly _id: string;

  @prop({
    trim: true,
    default: ''
  })
  readonly firstName: string;

  @prop({
    trim: true,
    default: ''
  })
  readonly lastName: string;

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
  readonly email: string;

  @prop({
    unique: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9\-]+$/,
      'Username can only contain alphanumeric characters and \'-\''
    ],
    required: [true, 'Username is required']
  })
  readonly username: string;

  @prop({
    default: ''
  })
  readonly passwordHash: string;

  @prop()
  readonly salt: string;

  @prop({
    default: 'local'
  })
  readonly provider: string;

  @arrayProp({
    items: String,
    enum: ['user', 'admin', 'superuser'],
    default: ['user']
  })
  readonly roles: [string];

  @prop({
    enum: ['en', 'fr', 'es', 'it', 'de'],
    default: 'en',
  })
  readonly language: string;

  @prop({
    default: Date.now
  })
  readonly created: Date;

  @prop()
  readonly lastModified: Date;

  @prop()
  readonly resetPasswordToken: string;

  @prop()
  readonly resetPasswordExpires: Date;

  @prop()
  readonly token: string;

  @prop({
    unique: true,
    index: true,
    sparse: true
  })
  readonly apiKey: string;
}
