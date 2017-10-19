'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	timeStampPlugin = require('../libs/timestamp.server.plugin'),
	FieldSchema = require('./form_field.server.model.js');

/**
 * Form Submission Schema
 */
var FormSubmissionSchema = new Schema({
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

    	delete form_fields[i].validFieldTypes;
		delete form_fields[i].disabled;
		delete form_fields[i].required;
		delete form_fields[i].isSubmission;
		delete form_fields[i].title;
		delete form_fields[i].fieldOptions;
		delete form_fields[i].ratingOptions;
		delete form_fields[i].logicJump;
		delete form_fields[i].description;
		delete form_fields[i].created;
		delete form_fields[i].lastModified;
		delete form_fields[i].deletePreserved;
    }
    next();
});

FormSubmissionSchema.path('form_fields', {
	set: function(form_fields){
		for (var i = 0; i < form_fields.length; i++) {
			form_fields[i].isSubmission = true;
			form_fields[i]._id = new mongoose.mongo.ObjectID();

			delete form_fields[i].validFieldTypes;
			delete form_fields[i].disabled;
			delete form_fields[i].required;
			delete form_fields[i].isSubmission;
			delete form_fields[i].title;
			delete form_fields[i].fieldOptions;
			delete form_fields[i].ratingOptions;
			delete form_fields[i].logicJump;
			delete form_fields[i].description;
			delete form_fields[i].created;
			delete form_fields[i].lastModified;
			delete form_fields[i].deletePreserved;

		}
		return form_fields;
	}
});

FormSubmissionSchema.plugin(timeStampPlugin, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});

module.exports = FormSubmissionSchema;
