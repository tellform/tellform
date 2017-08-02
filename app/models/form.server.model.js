'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash'),
	mUtilities = require('mongoose-utilities'),
	async = require('async'),
	Random = require('random-js'),
	mt = Random.engines.mt19937();

mt.autoSeed();

//Mongoose Models
var FieldSchema = require('./form_field.server.model.js');

var FormSubmissionSchema = require('./form_submission.server.model.js'),
	FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);


var ButtonSchema = new Schema({
	url: {
		type: String,
		match: [/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/],
	},
	action: String,
	text: String,
	bgColor: {
		type: String,
		match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
		default: '#5bc0de'
	},
	color: {
		type: String,
		match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
		default: '#ffffff'
	}
});

var VisitorDataSchema = new Schema({
	referrer: {
		type: String
	},
	lastActiveField: {
		type: Schema.Types.ObjectId
	},
	timeElapsed: {
		type: Number
	},
	isSubmitted: {
		type: Boolean
	},
	language: {
		type: String
	},
	ipAddr: {
		type: String,
		default: ''
	},
	deviceType: {
		type: String,
		enum: ['desktop', 'phone', 'tablet', 'other'],
		default: 'other'
	},
	userAgent: {
		type: String
	}

});

var formSchemaOptions = {
	toJSON: {
		virtuals: true
	}
};

/**
 * Form Schema
 */
var FormSchema = new Schema({
	title: {
		type: String,
		trim: true,
		required: 'Form Title cannot be blank'
	},
	language: {
		type: String,
		enum: ['en', 'fr', 'es', 'it', 'de'],
		default: 'en',
		required: 'Form must have a language'
	},
	analytics:{
		gaCode: {
			type: String
		},
		visitors: [VisitorDataSchema]
	},

	form_fields: [FieldSchema],
	submissions: [{
		type: Schema.Types.ObjectId,
		ref: 'FormSubmission'
	}],

	admin: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: 'Form must have an Admin'
	},
	startPage: {
		showStart:{
			type: Boolean,
			default: false
		},
		introTitle:{
			type: String,
			default: 'Welcome to Form'
		},
		introParagraph:{
			type: String
		},
        introButtonText:{
            type: String,
            default: 'Start'
        },
		buttons:[ButtonSchema]
	},
	endPage: {
		showEnd:{
			type: Boolean,
			default: false
		},
		title:{
			type: String,
			default: 'Thank you for filling out the form'
		},
		paragraph:{
			type: String
		},
		buttonText:{
			type: String,
			default: 'Go back to Form'
		},
		buttons:[ButtonSchema]
	},

	hideFooter: {
		type: Boolean,
		default: false
	},
	isLive: {
		type: Boolean,
		default: true
	},

	design: {
		colors:{
			backgroundColor: {
				type: String,
				match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
				default: '#fff'
			},
			questionColor: {
				type: String,
				match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
				default: '#333'
			},
			answerColor: {
				type: String,
				match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
				default: '#333'
			},
			buttonColor: {
				type: String,
				match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
			    default: '#fff'
            },
            buttonTextColor: {
                type: String,
                match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
                default: '#333'
            }
		},
		font: String
	}
}, formSchemaOptions);

/*
** In-Form Analytics Virtual Attributes
 */
FormSchema.virtual('analytics.views').get(function () {
	if(this.analytics && this.analytics.visitors && this.analytics.visitors.length > 0){
		return this.analytics.visitors.length;
	} else {
		return 0;
	}
});

FormSchema.virtual('analytics.submissions').get(function () {
	return this.submissions.length;
});

FormSchema.virtual('analytics.conversionRate').get(function () {
	if(this.analytics && this.analytics.visitors && this.analytics.visitors.length > 0){
		return this.submissions.length/this.analytics.visitors.length*100;
	} else {
		return 0;
	}
});

FormSchema.virtual('analytics.fields').get(function () {
	var fieldDropoffs = [];
	var visitors = this.analytics.visitors;
	var that = this;

	if(this.form_fields.length === 0) {
		return null;
	}

	for(var i=0; i<this.form_fields.length; i++){
		var field = this.form_fields[i];

		if(field && !field.deletePreserved){

			var dropoffViews =  _.reduce(visitors, function(sum, visitorObj){

					if(visitorObj.lastActiveField+'' === field._id+'' && !visitorObj.isSubmitted){
						return sum + 1;
					}
					return sum;
				}, 0);

			var continueViews, nextIndex;

			if(i !== this.form_fields.length-1){
				continueViews =  _.reduce(visitors, function(sum, visitorObj){
					nextIndex = that.form_fields.indexOf(_.find(that.form_fields, function(o) {
						return o._id+'' === visitorObj.lastActiveField+'';
					}));

					if(nextIndex > i){
						return sum + 1;
					}
					return sum;
				}, 0);
			} else {
				continueViews =  _.reduce(visitors, function(sum, visitorObj){
					if(visitorObj.lastActiveField+'' === field._id+'' && visitorObj.isSubmitted){
						return sum + 1;
					}
					return sum;
				}, 0);

			}

			var totalViews = dropoffViews+continueViews;
			var continueRate = 0;
			var dropoffRate = 0;
			
			if(totalViews > 0){
				continueRate = (continueViews/totalViews*100).toFixed(0);
				dropoffRate = (dropoffViews/totalViews*100).toFixed(0);
			}
			
			fieldDropoffs[i] = {
				dropoffViews: dropoffViews,
				responses: continueViews,
				totalViews: totalViews,
				continueRate: continueRate,
				dropoffRate: dropoffRate,
				field: field
			};

		}
	}

	return fieldDropoffs;
});

FormSchema.plugin(mUtilities.timestamp, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});

FormSchema.pre('save', function (next) {
	switch(this.language){
		case 'spanish':
			this.language = 'es';
			break;
		case 'french':
			this.language = 'fr';
			break;
		case 'italian':
			this.language = 'it';
			break;
		case 'german':
			this.language = 'de';
			break;
		default:
			this.language = 'en';
			break;
	}
	next();
});

function getDeletedIndexes(needle, haystack){
	var deletedIndexes = [];

	if(haystack.length > 0){
	  	for(var i = 0; i < needle.length; i++){
	    	if(haystack.indexOf(needle[i]) === -1){
				deletedIndexes.push(i);
	    	}
	  	}
	}
	return deletedIndexes;
}

function formFieldsAllHaveIds(form_fields){
	for(var i=0; i<form_fields.length; i++){
		if(!form_fields[i].hasOwnProperty('_id') && !form_fields[i].hasOwnProperty('globalId')){
			return false;
		}
	}
	return true;
}

FormSchema.pre('save', function (next) {
	var that = this;
	var _original;

	async.series([function(cb) {
		that.constructor
			.findOne({_id: that._id}).exec(function (err, original) {
			if (err) {
				return cb(err);
			} else if (!original){
				return next();
			} else {
				_original = original;
				return cb(null);
			}
		});
	},
	function(cb) {
		if(that.form_fields && that.isModified('form_fields') && formFieldsAllHaveIds(that.toObject().form_fields)){

			var current_form = that.toObject(),
				old_form_fields = _original.toObject().form_fields,
				new_ids = _.map(_.map(current_form.form_fields, 'globalId'), function(id){ return ''+id;}),
				old_ids = _.map(_.map(old_form_fields, 'globalId'), function(id){ return ''+id;}),
				deletedIds = getDeletedIndexes(old_ids, new_ids);

			//Check if any form_fileds were deleted
			if( deletedIds.length > 0 ){

				var modifiedSubmissions = [];

				async.forEachOfSeries(deletedIds,
					function (deletedIdIndex, key, cb_id) {

						var deleted_id = old_ids[deletedIdIndex];
						//Find FormSubmissions that contain field with _id equal to 'deleted_id'
						FormSubmission.
						find({ form: that, form_fields: {$elemMatch: {globalId: deleted_id} }  }).
						exec(function(err, submissions){
							if(err) {
								return cb_id(err);
							}

							//Preserve fields that have at least one submission
							if (submissions.length) {
								//Add submissions
								modifiedSubmissions.push.apply(modifiedSubmissions, submissions);
							}

							return cb_id(null);
						});
					},
					function (err) {
						if(err){
							console.error(err.message);
							return cb(err);
						}

						//Iterate through all submissions with modified form_fields
						async.forEachOfSeries(modifiedSubmissions, function (submission, key, callback) {

							var submission_form_fields = submission.toObject().form_fields;
							var currentform_form_fields = that.toObject().form_fields;

							//Iterate through ids of deleted fields
							for (var i = 0; i < deletedIds.length; i++) {
								var index = _.findIndex(submission_form_fields, function (field) {
									var tmp_id = field.globalId + '';
									return tmp_id === old_ids[deletedIds[i]];
								});

								var deletedField = submission_form_fields[index];

								//Hide field if it exists
								if (deletedField) {

									//Delete old form_field
									submission_form_fields.splice(index, 1);

									deletedField.deletePreserved = true;

									//Move deleted form_field to start
									submission_form_fields.unshift(deletedField);
									currentform_form_fields.unshift(deletedField);
								}
							}
							submission.form_fields = submission_form_fields;
							that.form_fields = currentform_form_fields;

							return callback(null);
						}, function (err) {
							return cb(err);
						});
					}
				);
			} else {
				return cb(null);
			}
		} else {
			return cb(null);
		}
	}],
	function(err, results){
		next(err);
	});
});

mongoose.model('Form', FormSchema);

