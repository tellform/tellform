'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mUtilities = require('mongoose-utilities'),
	FieldSchema = require('./form_field.server.model.js');

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

	timeElapsed: {
		type: Number
	},
	percentageComplete: {
		type: Number
	}
});

FormSubmissionSchema.pre('save', function (next) {
	//Iterate through form fields and format data
    for(var i = 0; i < this.form_fields.length; i++){
        if(this.form_fields[i].fieldType === 'dropdown'){
            this.form_fields[i].fieldValue = this.form_fields[i].fieldValue.option_value;
        }
    }
	next();
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

module.exports = FormSubmissionSchema;
