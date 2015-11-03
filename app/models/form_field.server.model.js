'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	mUtilities = require('mongoose-utilities'),
	_ = require('lodash'),
	Schema = mongoose.Schema;

var FieldOptionSchema = new Schema({
	option_id: {
		type: Number,
	},

	option_title: {
		type: String,
	},

	option_value: {
		type: String,
		trim: true,
	},
});


/**
 * FormField Schema
 */
var FormFieldSchema = new Schema({
	// formSubmission: {
	// 	 type: Schema.ObjectId, 
	// 	 ref: 'FormSubmission', 
	// 	 childPath: 'form_fields'
	// },

	title: {
		type: String,
		trim: true,
		required: 'Field Title cannot be blank',
	},
	description: {
		type: String,
		default: '',
	},

	logicJump: {
		type: Schema.Types.ObjectId,
		ref: 'LogicJump'
	},

	fieldOptions: [FieldOptionSchema],
	required: {
		type: Boolean,
		default: true,
	},
	disabled: {
		type: Boolean,
		default: false,
	},

	deletePreserved: {
		type: Boolean,
		default: false
	},
	validFieldTypes: {
		type: [String]
	},
	fieldType: {
		type: String,
		required: true,
		enum: [
		    'textfield',
		    'date',
		    'email',
		    'link',
		    'legal',
		    'url',
		    'textarea',
		    'statement',
		    'welcome',
		    'thankyou',
		    'file',
		    'dropdown',
		    'scale',
		    'rating',
		    'radio',
		    'checkbox',
		    'hidden',
		    'yes_no',
		    'natural',
		    'number'
		],
	},
	fieldValue: Schema.Types.Mixed
});

// FormFieldSchema.plugin(relationship, { relationshipPathName:'formSubmission' });
FormFieldSchema.plugin(mUtilities.timestamp, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});

FormFieldSchema.pre('save', function (next){
	this.validFieldTypes = mongoose.model('Field').schema.path('fieldType').enumValues;
	next();
});


mongoose.model('Field', FormFieldSchema);

module.exports = FormFieldSchema;

