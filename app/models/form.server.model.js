'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	pdfFiller = require('pdffiller'),
	_ = require('lodash'),
	config = require('../../config/config'),
	path = require('path'),
	mUtilities = require('mongoose-utilities'),
	fs = require('fs-extra'),
	async = require('async'),
	mkdirp = require('mkdirp'),
	Random = require('random-js'),
	mt = Random.engines.mt19937(),
	util = require('util');

mt.autoSeed();

//Mongoose Models
var FieldSchema = require('./form_field.server.model.js');
var Field = mongoose.model('Field');

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
	}
});

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
		enum: ['english', 'french', 'spanish'],
		required: 'Form must have a language',
		default: 'english'
	},
	description: {
		type: String,
		default: ''
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

	pdf: {
		type: Schema.Types.Mixed
	},
	pdfFieldMap: {
		type: Schema.Types.Mixed
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

	hideFooter: {
		type: Boolean,
		default: false
	},
	isGenerated: {
		type: Boolean,
		default: false
	},
	isLive: {
		type: Boolean,
		default: false
	},
	autofillPDFs: {
		type: Boolean,
		default: false
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
		font: String,
		backgroundImage: { type: Schema.Types.Mixed }
	},

	plugins: {
		oscarhost: {
			baseUrl: {
				type: String
			},
			settings: {
				lookupField: {
					type: Schema.Types.ObjectId,
					ref: 'Field'
				},
				updateType: {
					type: String,
					enum: ['upsert', 'force_add', 'force_update', 'fetch'],
				},
				fieldMap: {
					type: Schema.Types.Mixed,
				},
				validUpdateTypes: {
					type: [String]
				},
				validFields : {
					type: [String],
					default: [
						'address',
						'city',
						'email',
						'firstName',
						'hin',
						'lastName',
						'phone',
						'postal',
						'province',
						'sex',
						'spokenLanguage',
						'title',
						'DOB']
				}
			},
			auth: {
				user: {
					type: String
				},
				pass: {
					type: String
				}
			}
		}
	}
});

/*
** In-Form Analytics Virtual Attributes
 */
FormSchema.virtual('analytics.views').get(function () {
	return this.analytics.visitors.length;
});

FormSchema.virtual('analytics.submissions').get(function () {
	return this.submissions.length;
});

FormSchema.virtual('analytics.conversionRate').get(function () {
	return this.submissions.length/this.analytics.visitors.length*100;
});

FormSchema.virtual('analytics.fields').get(function () {
	var fieldDropoffs = [];
	var visitors = this.analytics.visitors;
	var that = this;

	for(var i=0; i<this.form_fields.length; i++){
		var field = this.form_fields[i];

		if(!field.deletePreserved){

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
			}else {
				continueViews =  _.reduce(visitors, function(sum, visitorObj){
					if(visitorObj.lastActiveField+'' === field._id+'' && visitorObj.isSubmitted){
						return sum + 1;
					}
					return sum;
				}, 0);

			}

			var totalViews = dropoffViews+continueViews;
			var continueRate = continueViews/totalViews*100;
			var dropoffRate = dropoffViews/totalViews*100;

			fieldDropoffs[i] = {
				dropoffViews: dropoffViews,
				continueViews: continueViews,
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

//Delete template PDF of current Form
FormSchema.pre('remove', function (next) {
	if(this.pdf && process.env.NODE_ENV === 'development'){
		//Delete template form
		fs.unlink(this.pdf.path, function(err){
			if (err) throw err;
		  	console.log('successfully deleted', this.pdf.path);
		});
	}
});

var _original;

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

//Move PDF to permanent location after new template is uploaded
FormSchema.pre('save', function (next) {
	var that = this;

	async.series([function(cb) {
		that.constructor
			.findOne({_id: that._id}).exec(function (err, original) {
			if (err) {
				console.log(err);
				return cb(err);
			} else {
				_original = original;
				//console.log('_original');
				//console.log(_original);
				return cb(null);
			}
		});
	}, function(cb) {
		//DAVID: TODO: Make this so we don't have to update the validFields property ever save
		if (that.plugins.oscarhost.hasOwnProperty('baseUrl')) {
			var validUpdateTypes = mongoose.model('Form').schema.path('plugins.oscarhost.settings.updateType').enumValues;
			that.plugins.oscarhost.settings.validUpdateTypes = validUpdateTypes;
		}
		return cb(null);
	},
		function(cb) {
			if (that.pdf) {
				async.series([
					function (callback) {
						if (that.isModified('pdf') && that.pdf.path) {

							var new_filename = that.title.replace(/ /g, '') + '_template.pdf';

							var newDestination = path.join(config.pdfUploadPath, that.admin.username.replace(/ /g, ''), that.title.replace(/ /g, '')),
								stat = null;

							try {
								stat = fs.statSync(newDestination);
							} catch (err) {
								mkdirp.sync(newDestination);
							}
							if (stat && !stat.isDirectory()) {
								return callback(new Error('Directory cannot be created because an inode of a different type exists at "' + config.pdfUploadPath + '"'), null);
							}

							var old_path = that.pdf.path;
							fs.move(old_path, path.join(newDestination, new_filename), {clobber: true}, function (err) {
								if (err) {
									console.error(err);
									return callback(new Error(err.message), 'task1');
								} else {
									that.pdf.path = path.join(newDestination, new_filename);
									that.pdf.name = new_filename;

									return callback(null, 'task1');
								}
							});
						} else {
							return callback(null, 'task1');
						}
					},
					function (callback) {
						if (that.isGenerated) {
							that.pdf.path = config.pdfUploadPath + that.admin.username.replace(/ /g, '') + '/' + that.title.replace(/ /g, '') + '/' + that.title.replace(/ /g, '') + '_template.pdf';
							that.pdf.name = that.title.replace(/ /g, '') + '_template.pdf';
							var _typeConvMap = {
								'Multiline': 'textarea',
								'Text': 'textfield',
								'Button': 'checkbox',
								'Choice': 'radio',
								'Password': 'password',
								'FileSelect': 'filefield',
								'Radio': 'radio'
							};


							pdfFiller.generateFieldJson(that.pdf.path, '', function (err, _form_fields) {

								//console.log(that.pdf.path);

								if (err) {
									return callback(new Error(err.message), null);
								} else if (!_form_fields.length || _form_fields === undefined || _form_fields === null) {
									return callback(new Error('Generated formfields is empty'), null);
								}

								console.log('autogenerating form');

								//Map PDF field names to FormField field names
								for (var i = 0; i < _form_fields.length; i++) {
									var _field = _form_fields[i];

									//Convert types from FDF to 'FormField' types
									if (_typeConvMap[_field.fieldType + '']) {
										_field.fieldType = _typeConvMap[_field.fieldType + ''];
									}

									var new_field = {};
									new_field.title = _field.fieldType + ' ' + Math.abs(mt());
									new_field.fieldValue = '';
									new_field.disabled = false;
									new_field.fieldType = _field.fieldType;
									new_field.deletePreserved = false;
									new_field.required = false;
									_form_fields[i] = new_field;
								}

								that.form_fields = _form_fields;

								that.isGenerated = false;
								return callback(null, 'task2');
							});
						} else {
							return callback(null, 'task2');
						}
					}
				], function (err, results) {
					if (err) {
						return cb(new Error({
							message: err.message
						}));
					} else {
						//console.log('ending form save1');
						return cb();
					}
				});
			}
			else if (_original) {
				if (_original.hasOwnProperty('pdf')) {
					fs.remove(_original.pdf.path, function (err) {
						if (err) return cb(err);
						console.log('file at ' + _original.pdf.path + ' successfully deleted');
						return cb();
					});
				}
				else return cb();
			}
			else return cb();
		},
		function(cb) {

			if(that.isModified('form_fields') && that.form_fields && _original){

				var old_form_fields = _original.form_fields,
					new_ids = _.map(_.pluck(that.form_fields, '_id'), function(id){ return ''+id;}),
					old_ids = _.map(_.pluck(old_form_fields, '_id'), function(id){ return ''+id;}),
					deletedIds = getDeletedIndexes(old_ids, new_ids);

				//Preserve fields that have at least one submission
				if( deletedIds.length > 0 ){

					var modifiedSubmissions = [];

					async.forEachOfSeries(deletedIds,
						function (deletedIdIndex, key, cb_id) {

							var deleted_id = old_ids[deletedIdIndex];

							//Find FormSubmissions that contain field with _id equal to 'deleted_id'
							FormSubmission.
							find({ form: that._id, admin: that.admin, form_fields: {$elemMatch: {submissionId: deleted_id} }  }).
							exec(function(err, submissions){
								if(err) {
									console.error(err);
									return cb_id(err);
								} else {
									//Delete field if there are no submission(s) found
									if (submissions.length) {
										//Add submissions
										modifiedSubmissions.push.apply(modifiedSubmissions, submissions);
									}

									return cb_id(null);
								}
							});
						},
						function (err) {
							if(err){
								console.error(err.message);
								return cb(err);
							} else {

								//Iterate through all submissions with modified form_fields
								async.forEachOfSeries(modifiedSubmissions, function (submission, key, callback) {

									//Iterate through ids of deleted fields
									for (var i = 0; i < deletedIds.length; i++) {

										var index = _.findIndex(submission.form_fields, function (field) {
											var tmp_id = field._id + '';
											return tmp_id === old_ids[deletedIds[i]];
										});

										var deletedField = submission.form_fields[index];

										//Hide field if it exists
										if (deletedField) {
											// console.log('deletedField\n-------\n\n');
											// console.log(deletedField);
											//Delete old form_field
											submission.form_fields.splice(index, 1);

											deletedField.deletePreserved = true;

											//Move deleted form_field to start
											submission.form_fields.unshift(deletedField);
											that.form_fields.unshift(deletedField);
											// console.log('form.form_fields\n--------\n\n');
											// console.log(that.form_fields);
										}
									}

									submission.save(function (err) {
										if (err) return callback(err);
										else return callback(null);
									});
								}, function (err) {
									if (err) {
										console.error(err.message);
										return cb(err);
									}
									else return cb();
								});
							}
						}
					);
				}
				else return cb(null);
			}
			else return cb(null);
		}],
		function(err, results){
			if (err) return next(err);
			return next();
		});
});

mongoose.model('Form', FormSchema);

