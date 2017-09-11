'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mUtilities = require('mongoose-utilities');

/**
 * Form Submission Schema
 */
var SubmissionSchema = new Schema({
	form: {
		type: Schema.Types.ObjectId,
		ref: 'Form',
		required: true
	},

	respondentEmail: {
		type: String,
		trim: true,
		match: [/.+\@.+\..+/, 'Please provide a valid email.']
	}
});

SubmissionSchema.plugin(mUtilities.timestamp, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});

module.exports = mongoose.model('Submission', SubmissionSchema);
