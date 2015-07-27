'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	pdfFiller = require('pdffiller'),
	satelize = require('satelize'),
	_ = require('lodash'),
	config = require('../../config/config'),
	path = require('path'),
	fs = require('fs-extra'),
	FieldSchema = require('./form_field.server.model.js');

/** 
 * Form Submission Schema
 */
var FormSubmissionSchema = new Schema({
	title:{
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},

	admin: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	form_fields: [Schema.Types.Mixed],//[FieldSchema],
	form: { 
		type:Schema.Types.ObjectId, 
		ref:'Form', 
		required: true
	},

	ipAddr: {
		type: String,
	},
	geoLocation: {
		type: Schema.Types.Mixed,
	},

	pdfFilePath: {
		type: Schema.Types.Mixed,
	},
	pdf: {
		type: Schema.Types.Mixed,
	},
	fdfData: {
		type: Schema.Types.Mixed,
	},

	timeElapsed: { //time (in seconds) it took for user to submit form
		type: Number,
	}, 

});

//Mongoose Relationship initialization
// FormSubmissionSchema.plugin(relationship, { relationshipPathName:'form' });


//Check for IP Address of submitting person 
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
	// console.log('ipAddr check');
	next();
});

//Generate autofilled PDF if flags are set 
FormSubmissionSchema.pre('save', function (next) {
	var fdfData, dest_filename, dest_path,
		that = this,
		_form = this.form;
	

	if(this.pdf && this.pdf.path){
		console.log(this.pdf);
		dest_filename = that.title.replace(/ /g,'')+'_submission_'+Date.now()+'.pdf';
		var __path = this.pdf.path.split('/').slice(0,this.pdf.path.split('/').length-1).join('/');
		dest_path = path.join(__path, dest_filename);

		that.pdfFilePath = dest_path;

		pdfFiller.fillForm(that.pdf.path, dest_path, that.fdfData, function(err){
			console.log('fdfData: \n');
			console.log(that.fdfData);

			// console.log('_form.pdf.path: '+_form.pdf.path);
			// console.log('dest_path: '+dest_path);

			if(err) {
				console.log('\n err.message: '+err.message);
				next( new Error(err.message) );
			}
			console.log('Field data from Form: '+that.title.replace(/ /g,'')+' outputed to new PDF: '+dest_path);
			next();
		});
	} else {
		next();
	}

});

module.exports = FormSubmissionSchema;

// mongoose.model('FormSubmission', FormSubmissionSchema);
