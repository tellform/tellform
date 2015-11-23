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
	util = require('util');

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

/**
 * Form Schema
 */
var FormSchema = new Schema({
	title: {
		type: String,
		trim: true,
		required: 'Form Title cannot be blank',
	},
	language: {
		type: String,
		enum: ['english', 'french', 'spanish'],
		required: 'Form must have a language',
		default: 'english'
	},
	description: {
		type: String,
		default: '',
	},
	form_fields: {
		type: [FieldSchema],
	},

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
			default: false,
		},
		introTitle:{
			type: String,
			default: 'Welcome to Form'
		},
		introParagraph:{
			type: String,
		},
		buttons:[ButtonSchema]
	},

	hideFooter: {
		type: Boolean,
		default: false,
	},
	isGenerated: {
		type: Boolean,
		default: false,
	},
	isLive: {
		type: Boolean,
		default: false,
	},
	autofillPDFs: {
		type: Boolean,
		default: false,
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
				default: '#333',
			},
			answerColor: { 
				type: String,
				match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
				default: '#333',
			},
			buttonColor: { 
				type: String,
				match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/]
			},
		},
		font: String,
		backgroundImage: { type: Schema.Types.Mixed }
	},

	plugins: {
		oscarhost: {
			baseUrl: {
				type: String,
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
					type: String,
				},
				pass: {
					type: String,
				}
			}
		}
	}
});

FormSchema.plugin(mUtilities.timestamp, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});
FormSchema.pre('init', function (next) {
	var validUpdateTypes= mongoose.model('Form').schema.path('plugins.oscarhost.settings.updateType').enumValues;
	this.plugins.oscarhost.settings.validUpdateTypes = validUpdateTypes;

	// this.plugins.oscarhost.settings.validFields = [
	// 	'address',
	// 	'city',
	// 	'email',
	// 	'firstName',
	// 	'hin',
	// 	'lastName',
	// 	'phone',
	// 	'postal',
	// 	'province',
	// 	'sex',
	// 	'spokenLanguage',
	// 	'title',
	// 	'DOB'];
	next();
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

//Set _original
FormSchema.pre('save', function (next) {

	this.constructor
      .findOne({_id: this._id}).exec(function(err, original){
      	if(err) {
      		console.log(err);
      		next(err);
        } else {
        	_original = original;
        	//console.log('_original');
        	// console.log(_original);
        	next();
        }
    });
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

//Move PDF to permanent location after new template is uploaded
FormSchema.pre('save', function (next) {
	if(this.pdf){
		var that = this;
		async.series([
			function(callback){
				if(that.isModified('pdf') && that.pdf.path){

					var new_filename = that.title.replace(/ /g,'')+'_template.pdf';

				    var newDestination = path.join(config.pdfUploadPath, that.admin.username.replace(/ /g,''), that.title.replace(/ /g,'')),
				    	stat = null;

				    try {
				        stat = fs.statSync(newDestination);
				    } catch (err) {
				        fs.mkdirSync(newDestination);
				    }
				    if (stat && !stat.isDirectory()) {
				        return callback( new Error('Directory cannot be created because an inode of a different type exists at "' + config.pdfUploadPath + '"'), null);
				    }

				    var old_path = that.pdf.path;
				    fs.move(old_path, path.join(newDestination, new_filename), {clobber: true}, function (err) {
						if (err) {
							console.error(err);
							callback( new Error(err.message), 'task1');
						}else {
							that.pdf.path = path.join(newDestination, new_filename);
							that.pdf.name = new_filename;

							callback(null,'task1');
						}
					});
				}else {
					callback(null,'task1');
				}

			},
			function(callback){
				if(that.isGenerated){
					that.pdf.path = path.join(config.pdfUploadPath, that.admin.username.replace(/ /g,''), that.title.replace(/ /g,''), that.title.replace(/ /g,'')+'_template.pdf');
					that.pdf.name = that.title.replace(/ /g,'')+'_template.pdf';
					var _typeConvMap = {
						'Multiline': 'textarea',
						'Text': 'textfield',
						'Button': 'checkbox',
						'Choice': 'radio',
						'Password': 'password',
						'FileSelect': 'filefield',
						'Radio': 'radio'
					};

					// console.log('autogenerating form');
					// console.log(that.pdf.path);

					pdfFiller.generateFieldJson(that.pdf.path, function(err, _form_fields){
						if(err){
							callback( new Error(err.message), null);
						}else if(!_form_fields.length || _form_fields === undefined || _form_fields === null){
							callback( new Error('Generated formfields is empty'), null);
						}

						//Map PDF field names to FormField field names
						for(var i = 0; i < _form_fields.length; i++){
							var field = _form_fields[i];

							//Convert types from FDF to 'FormField' types
							if(_typeConvMap[ field.fieldType+'' ]){
								field.fieldType = _typeConvMap[ field.fieldType+'' ];
							}

							// field = new Field(field);
							field.required = false;
							_form_fields[i] = field;
						}

						// console.log('NEW FORM_FIELDS: ');
						// console.log(_form_fields);

						that.form_fields = that.form_fields.concat(_form_fields);

						// console.log('\n\nOLD FORM_FIELDS: ');
						// console.log(that.form_fields);
						that.isGenerated = false;
						callback(null, 'task2');
					});
				}else{
					callback(null, 'task2');
				}
			}
		], function(err, results) {
			if(err){
				next(new Error({
					message: err.message
				}));
			}
			console.log('ending form save');
			next();

		});
	}else if(_original){
		if(_original.hasOwnProperty('pdf')){
			fs.remove(_original.pdf.path, function (err) {
				if(err) next(err);
				console.log('file at '+_original.pdf.path+' successfully deleted');
				next();
			});
		}
	}
	next();
});

FormSchema.pre('save', function (next) {

	// console.log('_original\n------------');
	// console.log(_original);
	//console.log('field has been deleted: ');
	//console.log(this.isModified('form_fields') && !!this.form_fields && !!_original);

	if(this.isModified('form_fields') && this.form_fields.length >= 0 && _original){

		var old_form_fields = _original.form_fields,
			new_ids = _.map(_.pluck(this.form_fields, '_id'), function(id){ return ''+id;}),
			old_ids = _.map(_.pluck(old_form_fields, '_id'), function(id){ return ''+id;}),
			deletedIds = getDeletedIndexes(old_ids, new_ids),
			that = this;

		// console.log('deletedId Indexes\n--------');
		// console.log(deletedIds);
		// console.log('old_ids\n--------');
		// console.log(old_ids);
		// console.log('new_ids\n--------');
		// console.log(new_ids);

		//Preserve fields that have at least one submission
		if( deletedIds.length > 0 ){

			var modifiedSubmissions = [];

			async.forEachOfSeries(deletedIds, 
				function (deletedIdIndex, key, callback) {
					
					var deleted_id = old_ids[deletedIdIndex];

					//Find FormSubmissions that contain field with _id equal to 'deleted_id'
					FormSubmission.
						find({ form: that._id, admin: that.admin, form_fields: {$elemMatch: {_id: deleted_id} }  }).
						exec(function(err, submissions){
							if(err){
								console.error(err);
								return callback(err);
							}

							//Delete field if there are no submission(s) found
							if(submissions.length) {
								// console.log('adding submissions');
								// console.log(submissions);
								//Add submissions 
								modifiedSubmissions.push.apply(modifiedSubmissions, submissions);
							}

							callback(null);
						});
					// }
				}, 
				function (err) {
					if(err){
						console.error(err.message);
						next(err);
					}

					// console.log('modifiedSubmissions\n---------\n\n');
					// console.log(modifiedSubmissions);

					//Iterate through all submissions with modified form_fields
					async.forEachOfSeries(modifiedSubmissions, function (submission, key, callback) {

						//Iterate through ids of deleted fields
						for(var i = 0; i < deletedIds.length; i++){

							//Get index of deleted field
							var index = _.findIndex(submission.form_fields, function(field) { 
								var tmp_id = field._id+'';
								return tmp_id === old_ids[ deletedIds[i] ];
							});

							var deletedField = submission.form_fields[index];

							//Hide field if it exists
							if(deletedField){
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
						  	if(err) callback(err);
							else callback(null);
						});	
					}, function (err) {
						if(err){
							console.error(err.message);
							next(err);
						}
						// console.log('form.form_fields\n--------\n\n');
						// console.log(that.form_fields);
						next();
					});
				}
			);
		}else {
			next();
		}
	}else {
		next();
	}
});


mongoose.model('Form', FormSchema);

