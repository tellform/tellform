'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	util = require('util'),
	mUtilities = require('mongoose-utilities'),
	_ = require('lodash'),
	Schema = mongoose.Schema;

var FieldOptionSchema = new Schema({
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

var RatingFieldSchema = new Schema({
	steps: {
		type: Number
	},
	shape: {
		type: String,
		enum: [
			'Heart',
			'Star',
			'thumbs-up',
			'thumbs-down',
			'Circle',
			'Square',
			'Check Circle',
			'Smile Outlined',
			'Hourglass',
			'bell',
			'Paper Plane',
			'Comment',
			'Trash'
		]
	},
	validShapes: {
		type: [String]
	}
});

/**
 * FormField Schema
 */
function BaseFieldSchema(){
	Schema.apply(this, arguments);

	this.add({
		title: {
			type: String,
			trim: true,
			required: 'Field Title cannot be blank'
		},
		description: {
			type: String,
			default: ''
		},

		logicJump: {
			type: Schema.Types.ObjectId,
			ref: 'LogicJump'
		},

		ratingOptions: {
			type: RatingFieldSchema,
			required: false,
			default: {}
		},
		fieldOptions: [FieldOptionSchema],
		required: {
			type: Boolean,
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
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
			]
		},
		fieldValue: Schema.Types.Mixed
	});

	this.plugin(mUtilities.timestamp, {
		createdPath: 'created',
		modifiedPath: 'lastModified',
		useVirtual: false
	});

	this.pre('save', function (next) {
		this.validFieldTypes = mongoose.model('Field').schema.path('fieldType').enumValues;

		if(this.fieldType === 'rating' && this.ratingOptions.validShapes.length === 0){
			this.ratingOptions.validShapes = mongoose.model('RatingOptions').schema.path('shape').enumValues;
		}
		next();
	});
}
util.inherits(BaseFieldSchema, Schema);

var FormFieldSchema = new BaseFieldSchema();

FormFieldSchema.pre('validate', function(next) {
	var error = new mongoose.Error.ValidationError(this);

	//If field is rating check that it has ratingOptions
	if(this.fieldType !== 'rating'){

		if(this.ratingOptions && this.ratingOptions.steps && this.ratingOptions.shape){
			error.errors.ratingOptions = new mongoose.Error.ValidatorError({path: 'ratingOptions', message: 'ratingOptions is only allowed for type \'rating\' fields.', type: 'notvalid', value: this.ratingOptions});
			return(next(error));
		}

	}else{
		//Setting default values for ratingOptions
		if(!this.ratingOptions.steps){
			this.ratingOptions.steps = 10;
		}
		if(!this.ratingOptions.shape){
			this.ratingOptions.shape = 'Star';
		}

		//Checking that the fieldValue is between 0 and ratingOptions.steps
		if(this.fieldValue+0 > this.ratingOptions.steps || this.fieldValue+0 < 0){
			this.fieldValue = 1;
			//error.errors.fieldValue =  mongoose.Error.ValidatorError({path:'fieldValue', message: 'fieldValue is not within proper range for rating field.', type: 'notvalid', value: this.fieldValue});
			//return(next(error));
		}
	}


	//If field is multiple choice check that it has ratingOptions
	if(this.fieldType !== 'dropdown' && this.fieldType !== 'radio' && this.fieldType === 'checkbox'){

		if(!this.fieldOptions || this.fieldOptions.length !== 0){
			error.errors.ratingOptions = new mongoose.Error.ValidatorError({path:'fieldOptions', message: 'fieldOptions are only allowed for type dropdown, checkbox or radio fields.', type: 'notvalid', value: this.ratingOptions});
			return(next(error));
		}
	}

	if(error)

	return next();
});


//Validate and convert dropdown value to fieldValue
FormFieldSchema.pre('validate', function (next) {
	return next();

	/*
	if(this.fieldType === 'dropdown' && this.fieldOptions.length > 0){
		for(var i = 0; i<this.fieldOptions.length; i++){

		}
	}*/
});


var Field = mongoose.model('Field', FormFieldSchema);
var RatingOptions = mongoose.model('RatingOptions', RatingFieldSchema);

module.exports = FormFieldSchema;

