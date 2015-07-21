'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    FieldSchema = require('./form_field.server.model.js'),
    FormSubmissionSchema = require('./form_submission.server.model.js'),
	Schema = mongoose.Schema,
	pdfFiller = require('pdffiller'),
	_ = require('lodash'),
	config = require('../../config/config'),
	path = require('path'),
	fs = require('fs-extra'),
	async = require('async');
	var Field = mongoose.model('Field', FieldSchema);
	var FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);


/**
 * Form Schema
 */
var FormSchema = new Schema({
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
		unique: true,
		required: 'Title cannot be blank'
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
		set: function(form_fields) {
	      this._previousFormFields = this.form_fields;
	      return form_fields;
	    }
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
});

FormSchema.post('init', function() {
  this._original = this.toObject();
});

//Delete template PDF of current Form
FormSchema.pre('remove', function (next) {
	if(this.pdf){
		//Delete template form
		fs.unlink(this.pdf.path, function(err){
			if (err) throw err;
		  	console.log('successfully deleted', this.pdf.path);
		});
	}
});

//Update lastModified and created everytime we save
FormSchema.pre('save', function (next) {
	var now = new Date();
	this.lastModified = now;
	if( !this.created ){
		this.created = now;
	}
	next();
});

//Concatenate submission and form's form_fields
// FormSchema.pre('save', function (next) {
// 	if(this.isModified('form_fields')){

// 		if(this.submissions.length){
// 			for(var i=0; i<this.submissions.length; i++){
// 				var submission = this.submissions[i];
// 				console.log(submission.form_fields);
// 				this.submissions[i].form_fields = submission.form_fields.concat(_.difference(this.form_fields, this._previousFormFields));
// 			}
// 		}

// 		this.form_fields = this._previousFormFields.concat(_.difference(this.form_fields, this._previousFormFields));
// 	}
// 	next();
// });

function getDeletedIndexes(needle, haystack){
	var deletedIndexes = [];

	if(haystack.length > 0){
	  	for(var i = 0; i < needle.length; i++){
	    	if(haystack.indexOf(needle[i]) <= -1){
				deletedIndexes.push(i);
	    	}
	  	}
	}
	return deletedIndexes;
}


FormSchema.pre('save', function (next) {
	if(this.isModified('form_fields')){

		var old_form_fields = this._original.form_fields,
			old_ids = _.pluck(this.form_fields, '_id'),
			new_ids = _.pluck(old_form_fields, '_id'),
			deletedIds = getDeletedIndexes(old_ids, new_ids),
			that = this;

		// console.log(deletedIds);
		// console.log('old_ids\n--------');
		// console.log(old_ids);
		// console.log('new_ids\n--------');
		// console.log(new_ids);

		//Preserve fields that have at least one submission
		if( deletedIds.length > 0 ){

			var modifiedSubmissions;

			async.forEachOfSeries(deletedIds, function (deletedIdIndex, key, callback) {
				
				var deleted_id = old_ids[deletedIdIndex];

				//Search for submissions with deleted form_field
				FormSubmission.
					find({ form: that, admin: that.admin, form_fields: {$elemMatch: {_id: deleted_id} } }).
					exec(function(err, submissions){
						if(err){
							console.error(err);
							return callback(err);
						}

						//Delete field if there are no submission(s) found
						if(submissions.length > 0) {
							//Push old form_field to start of array
							that.form_fields.unshift(old_form_fields[deletedIdIndex]);
							modifiedSubmissions.push.apply(modifiedSubmissions, submissions);
							console.log(modifiedSubmissions);
						}

						callback(null, modifiedSubmissions);
					}
				);
				}, function (err, submissions) {
				if(err){
					console.error(err.message);
					next(err);
				}

				console.log('preserved deleted fields');
				console.log(submissions);

				async.forEachOfSeries(modifiedSubmissions, function (submission, key, callback) {

					for(var i = 0; i < deletedIds.length; i++){
						var tmpField = _.find(submission.form_fields, function(field){
							return field._id === deletedIds[i];
						});

						var index = submission.form_fields.indexOf(tmpField);

						if(tmpField){
							//Delete old form_field
							submission.form_fields.splice(index, 1);

							//Move old form_field to start
							submission.form_fields.unshift(tmpField);
						}
					}

					submission.save(function (err) {
					  if (err) callback(err);
					  callback();
					});
					
				}, function (err) {
					if(err){
						console.error(err.message);
						next(err);
					}

					next();
				});

			});
		}
	}

	next();

});

//Move PDF to permanent location after new template is uploaded
FormSchema.pre('save', function (next) {

	if(this.pdf){
		var that = this;
		async.series([
			function(callback){
				if(that.isModified('pdf')){

					var new_filename = that.title.replace(/ /g,'')+'_template.pdf';

				    var newDestination = path.join(config.pdfUploadPath, that.admin.username.replace(/ /g,''), that.title.replace(/ /g,'')),
				    	stat = null;

				    try {
				        stat = fs.statSync(newDestination);
				    } catch (err) {
				        fs.mkdirSync(newDestination);
				    }
				    if (stat && !stat.isDirectory()) {
				        callback( new Error('Directory cannot be created because an inode of a different type exists at "' + config.pdfUploadPath + '"'), null);
				    }

				    fs.move(that.pdf.path, path.join(newDestination, new_filename), function (err) {
						if (err) {
							console.error(err);
							callback( new Error(err.message), null);
						}
						that.pdf.path = path.join(newDestination, new_filename);
						that.pdf.name = new_filename;

						callback(null,'task1');
					});
				}
				callback(null,'task1');
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

							field = new Field(field);
							field.required = false;
							_form_fields[i] = field;
						}

						// console.log('NEW FORM_FIELDS: ');
						// console.log(_form_fields);

						// console.log('\n\nOLD FORM_FIELDS: ');
						// console.log(that.form_fields);

						that.form_fields.concat(_form_fields);
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
	}else{
		next();
	}
});

//Autogenerate Form_fields from PDF if 'isGenerated' flag is set
// FormSchema.pre('save', function (next) {
// 	var field, _form_fields; 
	
// 	if(this.pdf){
// 		if(this.isGenerated){

// 			var _typeConvMap = {
// 				'Multiline': 'textarea',
// 				'Text': 'textfield',
// 				'Button': 'checkbox',
// 				'Choice': 'radio',
// 				'Password': 'password',
// 				'FileSelect': 'filefield',
// 				'Radio': 'radio'
// 			};

// 			var that = this;
// 			console.log('autogenerating form');

// 			try {
// 				pdfFiller.generateFieldJson(this.pdf.path, function(_form_fields){

// 					//Map PDF field names to FormField field names
// 					for(var i = 0; i < _form_fields.length; i++){
// 						field = _form_fields[i];

// 						//Convert types from FDF to 'FormField' types
// 						if(_typeConvMap[ field.fieldType+'' ]){
// 							field.fieldType = _typeConvMap[ field.fieldType+'' ];
// 						}

// 						field.fieldValue = '';
// 						field.created = Date.now();
// 						field.required = true;
// 	    				field.disabled  = false;

// 						// field = new Field(field);
// 						// field.save(function(err) {
// 						// 	if (err) {
// 						// 		console.error(err.message);
// 						// 		throw new Error(err.message);
// 						// 		});
// 						// 	} else {
// 						// 		_form_fields[i] = this;
// 						// 	}
// 						// });
// 						_form_fields[i] = field;
// 					}

// 					console.log('NEW FORM_FIELDS: ');
// 					console.log(_form_fields);

// 					console.log('\n\nOLD FORM_FIELDS: ');
// 					console.log(that.form_fields);

// 					that.form_fields = _form_fields;
// 					next();
// 				});
// 			} catch(err){
// 				next( new Error(err.message) );
// 			}
// 		}	
// 	}

// 	next();
// });

FormSchema.methods.generateFDFTemplate = function() {
	var _keys = _.pluck(this.form_fields, 'title'),
		_values = _.pluck(this.form_fields, 'fieldValue');

	_values.forEach(function(val){
		if(val === true){
			val = 'Yes';
		}else if(val === false) {
			val = 'Off';
		}
	});

	var jsonObj = _.zipObject(_keys, _values);

	return jsonObj;
};


mongoose.model('Form', FormSchema);
