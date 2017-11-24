'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash'),
	timeStampPlugin = require('../libs/timestamp.server.plugin'),
	async = require('async'),
	constants = require('../libs/constants');

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
	socketId: {
		type: String
	},
	referrer: {
		type: String
	},
	filledOutFields: {
		type: [Schema.Types.ObjectId]
	},
	timeElapsed: {
		type: Number
	},
	isSubmitted: {
		type: Boolean
	},
	language: {
		type: String,
		enum: constants.languageTypes,
		default: 'en',
	},
	ipAddr: {
		type: String
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

	form_fields: {
		type: [FieldSchema],
		default: []
	},
	submissions: {
		type: [{
			type: Schema.Types.ObjectId,
			ref: 'FormSubmission'
		}],
		default: []
	},
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

	selfNotifications: {
		fromField: {
			type: String
		},
		toEmails: {
			type: String
		},
		subject: {
			type: String
		},
		htmlTemplate: {
			type: String
		},
		enabled: {
			type: Boolean,
			default: false
		}
	},

	respondentNotifications: {
		toField: {
			type: String
		},
		fromEmails: {
			type: String,
			match: [/.+\@.+\..+/, 'Please fill a valid email address']
		},
		subject: {
			type: String,
			default: 'Tellform: Thank you for filling out this TellForm'
		},
		htmlTemplate: {
			type: String,
			default: 'Hello, <br><br> We’ve received your submission. <br><br> Thank you & have a nice day!',
		},
		enabled: {
			type: Boolean,
			default: false
		}
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
		colors: {
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

FormSchema.plugin(timeStampPlugin, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
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
	if(form_fields){
		for(var i=0; i<form_fields.length; i++){
			if(form_fields[i] && !form_fields[i].hasOwnProperty('_id') && !form_fields[i].hasOwnProperty('globalId')){
				return false;
			}
		}
	}
	return true;
}

FormSchema.pre('save', function (next) {
	var that = this;
	var _original;

	async.series([
		function(cb) {
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
					});
				} else {
					return cb(null);
				}
			} else {
				return cb(null);
			}
		}
	],
	function(err){
		if(err){
			return next(err);
		}
		next();
	});
});

FormSchema.index({created: 1});

mongoose.model('Form', FormSchema);

