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
	form_fields: [{type: Schema.Types.Mixed}],
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

//Check for IP Address of submitting person 
// FormSubmissionSchema.pre('save', function (next){
// 	if(this.ipAddr){
// 		if(this.ipAddr.modified){
// 			satelize.satelize({ip: this.ipAddr}, function(err, geoData){
// 				if (err) next( new Error(err.message) );

// 				this.geoLocation = JSON.parse(geoData);
// 				next();
// 			});
// 		}
// 	}
// 	console.log('ipAddr check');
// 	next();
// });

//Generate autofilled PDF if flags are set 
FormSubmissionSchema.pre('save', function (next) {
	// debugger;
	var fdfData, dest_filename, dest_path;
	var that = this;
	var _form = this.form;

	// Form.findById(that.form, function(err, _form){
		// if(err) next( new Error(err.mesasge) );
		
		that.title = _form.title;
		// console.log(_form);

		if(_form.autofillPDFs){

			dest_filename = _form.title.replace(/ /g,'')+'_submission_'+Date.now()+'.pdf';
			dest_path = path.join(config.pdfUploadPath, dest_filename);

			this.pdfFilePath = dest_path;


			pdfFiller.fillForm(_form.pdf.path, dest_path, that.fdfData, function(err){
				console.log('fdfData: \n');
				console.log(that.fdfData);

				// console.log('_form.pdf.path: '+_form.pdf.path);
				// console.log('dest_path: '+dest_path);

				if(err) {
					console.log('\n err.message: '+err.message);
					next( new Error(err.message) );
				}
				console.log('Field data from Form: '+_form.title.replace(/ /g,'')+' outputed to new PDF: '+dest_path);
				next();
			});
		} else {
			next();
		}

	// });

});

module.exports = FormSubmissionSchema;

// mongoose.model('FormSubmission', FormSubmissionSchema);
