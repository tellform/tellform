'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	relationship = require('mongoose-relationship'),
	_ = require('lodash'),
	Schema = mongoose.Schema;

/**
 * Question Schema
 */
var FormFieldSchema = new Schema({
	// formSubmission: {
	// 	 type: Schema.ObjectId, 
	// 	 ref: 'FormSubmission', 
	// 	 childPath: 'form_fields'
	// },

	created: {
		type: Date,
		default: Date.now
	},
	lastModified: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		trim: true,
		required: 'Field title cannot be blank'
	},
	description: {
		type: String,
		default: '',
	},

	logicJump: {
		type: Schema.Types.ObjectId,
		ref: 'LogicJump'
	},

	//DAVID: TODO: SEMI-URGENT: Need to come up with a schema for field options
	fieldOptions: [{
		type: Schema.Types.Mixed
	}],
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
		required: 'Field type cannot be blank',
		validate: [validateFormFieldType, 'Invalid field type']
	},
	fieldValue: Schema.Types.Mixed
});

// FormFieldSchema.plugin(relationship, { relationshipPathName:'formSubmission' });

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

var cloneFieldSchema = _.cloneDeep(FormFieldSchema);
mongoose.model('Field', FormFieldSchema);

module.exports = cloneFieldSchema;

