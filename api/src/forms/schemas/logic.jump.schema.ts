import * as mongoose from 'mongoose';

export const LogicJumpSchema = new mongoose.Schema({
  expressionString: {
    type: String,
    enum: [
      'field == static',
      'field != static',
      'field > static',
      'field >= static',
      'field <= static',
      'field < static',
      'field contains static',
      'field !contains static',
      'field begins static',
      'field !begins static',
      'field ends static',
      'field !ends static'
    ]
  },
  fieldA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FormField'
  },
  valueB: {
    type: mongoose.Schema.Types.String
  },
  jumpTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FormField'
  },
  enabled: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  }
});
