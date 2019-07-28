import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    default: ''
  },
  lastName: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: 'Account already exists with this email',
    match: [
      /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please fill a valid email address'
    ],
    required: [true, 'Email is required']
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9\-]+$/,
      'Username can only contain alphanumeric characters and \'-\''
    ],
    required: [true, 'Username is required']
  },
  passwordHash: {
    type: String,
    default: ''
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    default: 'local'
  },
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin', 'superuser']
    }],
    default: ['user']
  },
  language: {
    type: String,
    enum: ['en', 'fr', 'es', 'it', 'de'],
    default: 'en',
  },
  lastModified: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },

  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  token: String,
  apiKey: {
    type: String,
    unique: true,
    index: true,
    sparse: true
  }
});
