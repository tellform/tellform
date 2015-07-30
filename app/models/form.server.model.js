'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    FieldSchema = require('./form_field.server.model.js'),
    FormSubmissionSchema = require('./form_submission.server.model.js'),
	Schema = mongoose.Schema,
	pdfFiller = require('node-pdffiller'),
	_ = require('lodash'),
	config = require('../../config/config'),
	path = require('path'),
	fs = require('fs-extra'),
	async = require('async'),
	Field = mongoose.model('Field', FieldSchema),
	FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);


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
	saveCount: {
		type: Number,
		default: 0,
	},
	design: {
		colors:{
			backgroundColor: String,
			questionColor: String,
			answerColor: String,
			buttonColor: String,

		},
		font: String,
<<<<<<< HEAD
		backgroundImage: { type: Schema.Types.Mixed }
=======
		backgroundImage: type: Schema.Types.Mixed
>>>>>>> 33243bea2a1f74f8f417b240f5ad068c1d05c6bd
	}
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
var _original;
// FormSchema.post( 'init', function() {
//     _original = this.toObject();
//     console.log(this);
// } );
// FormSchema.virtual('_original').get(function () {
//   	this.constructor   // ≈ mongoose.model('…', FieldSchema).findById
//       .findOne({_id: this._id}).exec(function(err, original){
//       	if(err) {
//       		console.log(err);
//       		throw err;
//         } else {
//         	console.log(original);
//         	if(original) return original.toObject();
//         	else return null;
        	
//         }
//     });
// });

//Set _original
FormSchema.pre('save', function (next) {
	this.saveCount = this.saveCount++;
	console.log('saveCount: '+this.saveCount);
	// console.log(this.constructor.model);
	// console.log(FormModel);
	this.constructor   // ≈ mongoose.model('…', FieldSchema).findById
      .findOne({_id: this._id}).exec(function(err, original){
      	if(err) {
      		console.log(err);
      		next(err);
        } else {
        	
        	_original = original;
        	// console.log('_original');
        	// console.log(_original);
        	next();
        }
    });
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

					console.log('autogenerating form');
					// console.log(that.pdf.path);

					pdfFiller.generateFieldJson(that.pdf.path, function(err, _form_fields){
						if(err){
							callback( new Error(err.message), null);
						}else if(!_form_fields.length || _form_fields === undefined || _form_fields === null){
							callback( new Error('Generated formfields is empty'), null);
						}

						// console.log(_form_fields);
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
		if(_original.pdf){
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
	// var _original = this._original;
	// console.log('_original\n------------');
	// console.log(_original);
	// console.log('field has been deleted: ');
	// console.log(this.isModified('form_fields') && !!this.form_fields && !!_original);

	if(this.isModified('form_fields') && this.form_fields.length >= 0 && _original){

		var old_form_fields = _original.form_fields,
			new_ids = _.map(_.pluck(this.form_fields, '_id'), function(id){ return ''+id;}),
			old_ids = _.map(_.pluck(old_form_fields, '_id'), function(id){ return ''+id;}),
			deletedIds = getDeletedIndexes(old_ids, new_ids),
			that = this;

		console.log('deletedId Indexes\n--------');
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

					//Search for submissions with deleted form_field
					// if(submissions.length){
					// 	submissionsWithDeletedField = _.select(form.submissions, function(submission){  
					// 		var field = _(submission.form_fields).filter(function(field) { return field._id === deleted_id; })
					// 		return !!field;
					// 	});

					// 	//Push old form_field to start of array
					// 	if(submissionsWithDeletedField.length){
					// 		that.form_fields.unshift(old_form_fields[deletedIdIndex]);
					// 		modifiedSubmissions.push.apply(modifiedSubmissions, submissionsWithDeletedField);
					// 		console.log(modifiedSubmissions);
					// 	}

					// 	callback(null, modifiedSubmissions);
					// } else{
					FormSubmission.
						find({ form: that._id, admin: that.admin, form_fields: {$elemMatch: {_id: deleted_id} } }).
						exec(function(err, submissions){
							if(err){
								console.error(err);
								return callback(err);
							}
							// console.log(submissions);
	

						//Delete field if there are no submission(s) found
						if(submissions.length) {
							//Push old form_field to start of array
							// that.form_fields.unshift(old_form_fields[deletedIdIndex]);
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

					console.log('preserved deleted fields');
					// console.log(submissions);

					async.forEachOfSeries(modifiedSubmissions, function (submission, key, callback) {

						for(var i = 0; i < deletedIds.length; i++){

							var index = _.findIndex(submission.form_fields, function(field) { 
								var tmp_id = field._id+'';
								// console.log(tmp_id === old_ids[ deletedIds[i] ]);
								return tmp_id === old_ids[ deletedIds[i] ];
							});

							// console.log('index: '+index);

							var tmpField = submission.form_fields[index];

							if(tmpField){
								// console.log('tmpField\n-------\n\n');
								// console.log(tmpField);
								//Delete old form_field
								submission.form_fields.splice(index, 1);

								tmpField.deletePreserved = true;
								//Move old form_field to start
								submission.form_fields.unshift(tmpField);

								that.form_fields.unshift(tmpField);
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
