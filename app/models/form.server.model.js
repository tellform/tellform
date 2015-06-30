'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    FieldSchema = require('./form_field.server.model.js'),
	Schema = mongoose.Schema,
	pdfFiller = require('pdfFiller'),
	_ = require('lodash'),
	config = require('../../config/config'),
	path = require('path'),
	fs = require('fs-extra');

var Field = mongoose.model('Field', FieldSchema);


/**
 * Form Schema
 */
var FormSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		unique: true,
		required: 'Title cannot be blank'
	},
	description: {
		type: String,
		default: '',
	},
	form_fields: [FieldSchema],

	submissions: [{
		type: Schema.Types.ObjectId,
		ref: 'FormSubmission'
	}],

	admin: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},

	pdf: {
		type: Schema.Types.Mixed
	},
	pdfFieldMap: {
		type: Schema.Types.Mixed
	},
	hideFooter: {
		type: Boolean,
		default: true,
	},
	isGenerated: {
		type: Boolean,
		default: false,
	},
	autofillPDFs: {
		type: Boolean,
		default: false,
	},
});

//Move PDF to permanent location after first save
FormSchema.pre('save', function (next) {
	// console.log(this.pdf);
	// debugger;

	if(this.pdf){
		if(this.pdf.modified){

			var new_filename = this.pdf.title.trim()+'_template.pdf';

		    var newDestination = path.join(config.pdfUploadPath, this.pdf.title.trim()),
		    	stat = null;

		    try {
		        stat = fs.statSync(newDestination);
		    } catch (err) {
		        fs.mkdirSync(newDestination);
		    }
		    if (stat && !stat.isDirectory()) {
		    	console.log('Directory cannot be created');
		        next( new Error('Directory cannot be created because an inode of a different type exists at "' + config.pdfUploadPath + '"') );
		    }

			console.log('about to move PDF');
		    fs.move(this.pdf.path, path.join(newDestination, new_filename), function (err) {
				if (err) {
					console.error(err);
					next( new Error(err.message) );
				}

				this.pdf.path = path.join(newDestination, new_filename);
				this.pdf.name = new_filename;

				console.log('PDF file:'+this.pdf.name+' successfully moved to: '+this.pdf.path);

				next();
			});

		}
	}else {
		next();
	}
});

//Autogenerate FORM from PDF if 'isGenerated' flag is 'true'
FormSchema.pre('save', function (next) {
	var field, _form_fields; 
	
	if(this.isGenerated && this.pdf){

		var _typeConvMap = {
			'Text': 'textfield',
			'Button': 'checkbox'
		};

		var that = this;
		console.log('autogenerating form');

		try {
			pdfFiller.generateFieldJson(this.pdf.path, function(_form_fields){

				//Map PDF field names to FormField field names
				for(var i = 0; i < _form_fields.length; i++){
					field = _form_fields[i];

					//Convert types from FDF to 'FormField' types
					if(_typeConvMap[ field.fieldType+'' ]){
						field.fieldType = _typeConvMap[ field.fieldType+'' ];
					}

					// field.created = Date.now();
					field.fieldValue = '';
					// field.required = true;
    				//field.disabled  = false;

					// field = new Field(field);
					// field.save(function(err) {
					// 	if (err) {
					// 		console.error(err.message);
					// 		throw new Error(err.message);
					// 		});
					// 	} else {
					// 		_form_fields[i] = this;
					// 	}
					// });
					_form_fields[i] = field;
				}

				console.log('NEW FORM_FIELDS: ');
				console.log(_form_fields);

				console.log('\n\nOLD FORM_FIELDS: ');
				console.log(that.form_fields);

				that.form_fields = _form_fields;
				next();
			});
		} catch(err){
			next( new Error(err.message) );
		}

	}	

	//Throw error if we encounter form with invalid type
	next();
});

FormSchema.methods.convertToFDF = function (cb) {
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
