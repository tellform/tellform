'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	relationship = require('mongoose-relationship'),
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
	fieldType: {
		type: String,
		required: true,
		validate: [validateFormFieldType, 'Invalid field type']
	},
	fieldValue: Schema.Types.Mixed
});

// FormFieldSchema.plugin(relationship, { relationshipPathName:'formSubmission' });
FormFieldSchema.plugin(mUtilities.timestamp, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});
FormFieldSchema.static('validTypes', function(){
	return [
	    'textfield',
	    'date',
	    'email',
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
	  ];
});

// fieldType Validation
function validateFormFieldType(value) {
  if (!value) { return false; }

  var validTypes = [
	    'textfield',
	    'date',
	    'email',
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
	  ];

  if (validTypes.indexOf(value) > -1) { 
    return true;
  }
  return false;
};

// var cloneFieldSchema = _.cloneDeep(FormFieldSchema);
mongoose.model('Field', FormFieldSchema);

module.exports = FormFieldSchema;

