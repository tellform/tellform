'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	freegeoip = require('node-freegeoip'),
	_ = require('lodash'),
	config = require('../../config/config'),
	path = require('path'),
	fs = require('fs-extra'),
	mUtilities = require('mongoose-utilities'),
	async = require('async'),
	FieldSchema = require('./form_field.server.model.js');

// Setter function for form_fields
function formFieldsSetter(form_fields) {
	for (var i = 0; i < form_fields.length; i++) {
		form_fields[i].isSubmission = true;
		form_fields[i].submissionId = form_fields[i]._id;
		form_fields[i]._id = new mongoose.mongo.ObjectID();
	}
	return form_fields;
}

/**
 * Form Submission Schema
 */
var FormSubmissionSchema = new Schema({
	title: {
		type: String
	},

	admin: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	form_fields: [FieldSchema],

	form: {
		type: Schema.Types.ObjectId,
		ref: 'Form',
		required: true
	},

	ipAddr: {
		type: String
	},
	geoLocation: {
		Country: {
			type: String
		},
		Region: {
			type: String
		},
		City: {
			type: String
		}
	},
	device: {
		type: {
			type: String
		},
		name: {
			type: String
		}
	},

	pdfFilePath: {
		type: Schema.Types.Mixed
	},
	pdf: {
		type: Schema.Types.Mixed
	},
	fdfData: {
		type: Schema.Types.Mixed
	},

	timeElapsed: {
		type: Number
	},
	percentageComplete: {
		type: Number
	},


	hasPlugins: {
		oscarhost: {
			type: Boolean,
			default: false
		}
	}
});

FormSubmissionSchema.path('form_fields', {
	set: function(form_fields){
		for (var i = 0; i < form_fields.length; i++) {
			form_fields[i].isSubmission = true;
			form_fields[i].submissionId = form_fields[i]._id;
			form_fields[i]._id = new mongoose.mongo.ObjectID();
		}
		return form_fields;
	}
});

FormSubmissionSchema.plugin(mUtilities.timestamp, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});

//Check for IP Address of submitting person
FormSubmissionSchema.pre('save', function (next) {
	var self = this;
	if (this.ipAddr) {
		if (this.isModified('ipAddr') || !this.geoLocation) {
			freegeoip.getLocation(this.ipAddr, function (err, location) {
				if (err) return next(err);
				self.geoLocation = location;
				return next();
			});
		}
	}
	return next();
});

module.exports = FormSubmissionSchema;
