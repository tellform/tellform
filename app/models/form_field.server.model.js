'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	util = require('util'),
	mUtilities = require('mongoose-utilities'),
	_ = require('lodash'),
	Schema = mongoose.Schema,
	LogicJumpSchema = require('./logic_jump.server.model');

const UIDGenerator = require('uid-generator');
const uidgen3 = new UIDGenerator(256, UIDGenerator.BASE62);

var RatingFieldSchema = new Schema({
	steps: {
		type: Number,
		min: 1,
		max: 10
	},
	shape: {
		type: String,
		enum: [
			'Heart',
			'Star'
		]
	}
});

/**
 * FormField Schema
 */
function BaseFieldSchema(){
	Schema.apply(this, arguments);

	this.add({
		globalId: {
			type: String,
    	},
		title: {
			type: String,
			trim: true,
			default: ''
		},
		description: {
			type: String,
			default: ''
		},

		logicJump: LogicJumpSchema,

		ratingOptions: RatingFieldSchema,
		fieldOptions: [String],
		fieldOptionsFromFile: {
			type: Boolean,
			default: false
		},
		fieldOptionsFile: {
			type: String
		},
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
				'textarea',
				'email',
				'number',
				'dropdown',
				'date',
				'yes_no',
				'rating',
				'statement',
				'section',
				'link',
				'file',
				'hidden',
				'legal',
				'radio'
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
			console.error(error);
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
		}
	}


	//If field is multiple choice check that it has field
	if(this.fieldType !== 'dropdown' && this.fieldType !== 'radio' && this.fieldType !== 'checkbox'){
		if(this.fieldOptions && this.fieldOptions.length > 0){
			error.errors.ratingOptions = new mongoose.Error.ValidatorError({path:'fieldOptions', message: 'fieldOptions are only allowed for type dropdown, checkbox or radio fields.', type: 'notvalid', value: this.ratingOptions});
			console.error(error);
			return(next(error));
		}
	}

	return next();
});

//LogicJump Save
FormFieldSchema.pre('save', function(next) {
	if(this.logicJump && this.logicJump.fieldA) {
		if(this.logicJump.jumpTo === '') delete this.logicJump.jumpTo;
	}
	if(!this.globalId){
		this.globalId = uidgen3.generateSync()
	}
	next();
});


var Field = mongoose.model('Field', FormFieldSchema);
var RatingOptions = mongoose.model('RatingOptions', RatingFieldSchema);

module.exports = FormFieldSchema;
