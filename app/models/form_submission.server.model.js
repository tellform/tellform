'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	pdfFiller = require('pdfFiller'),
	satelize = require('satelize'),
	_ = require('lodash'),
	config = require('../../config/config'),
	path = require('path'),
	Form = mongoose.model('Form'),
	fs = require('fs-extra');

/** 
 * Form Submission Schema
 */
var FormSubmissionSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now
	},

	admin: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	form_fields: [Schema.Types.Mixed],
	form: {
		type: Schema.Types.ObjectId,
		ref: 'Form',
		required: true
	},

	ipAddr: {
		type: String,
		required: false
	},
	geoLocation: {
		type: Schema.Types.Mixed,
	},

	pdfFilePath: {
		type: Schema.Types.Mixed,
	},
	fdfData: {
		type: Schema.Types.Mixed,
	},

	timeElapsed: { //time (in seconds) it took for user to submit form
		type: Number,
	}, 

});


FormSubmissionSchema.pre('save', function (next){
	if(this.ipAddr){
		if(this.ipAddr.modified){
			satelize.satelize({ip: this.ipAddr}, function(err, geoData){
				if (err) next( new Error(err.message) );

				this.geoLocation = JSON.parse(geoData);
				next();
			});
		}
	}
	console.log('ipAddr check');
	next();
});

FormSubmissionSchema.pre('save', function (next) {
	// debugger;
	var fdfData, dest_filename, dest_path;
	var that = this;

	Form.findById(that.form, function(err, _form){
		if(err) next( new Error(err.mesasge) );
		
		this.title = _form.title;
		console.log(_form);
		//Create filled-out PDF, if there is a pdf template
		if(_form.autofillPDFs){

			dest_filename = this.title.trim()+'_submission_'+Date.now()+'.pdf';
			dest_path = path.join(config.pdfUploadPath, this.title.trim(), dest_filename);

			this.pdfFilePath = dest_path;

			console.log('autofillPDFs check');

			pdfFiller.fillForm(_form.pdf.path, dest_path, this.fdfData, function(err){

				if(err) next( new Error(err.message) );

				console.log('Field data from Form: '+this.title.trim()+' outputed to new PDF: '+dest_path);
				next();
			});
		} else {
		
			next();
		}

	});


});

mongoose.model('FormSubmission', FormSubmissionSchema);