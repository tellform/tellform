import * as mongoose from 'mongoose';

export const VisitorDataSchema = new mongoose.Schema({
  socketId: {
    type: String
  },
  referrer: {
    type: String
  },
  filledOutFields: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  timeElapsed: {
    type: Number
  },
  isSubmitted: {
    type: Boolean
  },
  language: {
    type: String,
    enum: ['en', 'fr', 'es', 'it', 'de'],
    default: 'en',
  },
  ipAddr: {
    type: String
  },
  deviceType: {
    type: String,
    enum: ['desktop', 'phone', 'tablet', 'other'],
    default: 'other'
  },
  userAgent: {
    type: String
  }
});
