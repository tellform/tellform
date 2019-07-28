import * as mongoose from 'mongoose';

export const FieldOptionSchema = new mongoose.Schema({
  option_id: {
    type: Number
  },

  option_title: {
    type: String
  },

  option_value: {
    type: String,
    trim: true
  }
});
