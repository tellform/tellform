'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	pdfFiller = require('pdffiller'),
	freegeoip = require('node-freegeoip'),
	_ = require('lodash'),
	config = require('../../config/config'),
	path = require('path'),
	fs = require('fs-extra'),
	mUtilities = require('mongoose-utilities'),
	soap = require('soap'),
	async = require('async'),
	FieldSchema = require('./form_field.server.model.js'),
	OscarSecurity = require('../../scripts/oscarhost/OscarSecurity');

var FieldSchema = require('./form_field.server.model.js');

var newDemoTemplate = {
	address: '880-9650 Velit. St.',
	city: '',
	dateOfBirth: '10',
	displayName: 'LITTLE, URIAH',
	email: '',
	firstName: 'Uriah F.',
	hin: '',
	lastName: 'Little',
	lastUpdateDate: Date.now(),
	monthOfBirth: '05',
	officialLanguage: 'English',
	phone: '250-',
	phone2: '',
	postal: 'S4M 7T8',
	province: 'BC',
	sex: 'F',
	sexDesc: 'Female',
	sin: '',
	spokenLanguage: 'English',
	title: 'MS.',
	yearOfBirth: '2015'
};


// Setter function for form_fields
function formFieldsSetter(form_fields) {
	for (var i = 0; i < form_fields.length; i++) {
		form_fields[i].isSubmission = true;
		form_fields[i].submissionId = form_fields[i]._id;
		form_fields[i]._id = new mongoose.mongo.ObjectID();
	}
	//console.log(form_fields)
	return form_fields;
}

/**
 * Form Submission Schema
 */
var FormSubmissionSchema = new Schema({
	title: {
		type: String
	},

	admin: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	form_fields: [FieldSchema],

	form: {
		type: Schema.Types.ObjectId,
		ref: 'Form',
		required: true
	},

	ipAddr: {
		type: String
	},
	geoLocation: {
		Country: {
			type: String
		},
		Region: {
			type: String
		},
		City: {
			type: String
		}
	},
	device: {
		type: {
			type: String
		},
		name: {
			type: String
		}
	},

	pdfFilePath: {
		type: Schema.Types.Mixed
	},
	pdf: {
		type: Schema.Types.Mixed
	},
	fdfData: {
		type: Schema.Types.Mixed
	},

	timeElapsed: {
		type: Number
	},
	percentageComplete: {
		type: Number
	},

	//TODO: DAVID: Need to not have this hardcoded
	oscarDemoNum: {
		type: Number
	},

	hasPlugins: {
		oscarhost: {
			type: Boolean,
			default: false
		}
	}
});

FormSubmissionSchema.path('form_fields').set(formFieldsSetter);

FormSubmissionSchema.plugin(mUtilities.timestamp, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});

//Oscarhost API hook
FormSubmissionSchema.pre('save', function (next) {

	var self = this;

	if (this.hasPlugins.oscarhost) {
		mongoose.model('Form').findById(self.form, function (err, _form) {
			var form_ids = _.map(_.pluck(_form.form_fields, '_id'), function (id) {
					return '' + id;
				}),
				submission_ids = _.pluck(self.form_fields, '_id');

			// console.log('Form form_field ids\n--------');
			// console.log(form_ids);
			// console.log('FormSubmission [form_field ids]\n--------');
			// console.log(submission_ids);

			if (err) return next(err);
			// console.log(_form);
			// console.log('should push to api');
			// console.log( (!this.oscarDemoNum && !!_form.plugins.oscarhost.baseUrl && !!_form.plugins.oscarhost.settings.fieldMap) );
			return next();
		});
	} else {
		return next();
	}

});

//Check for IP Address of submitting person
FormSubmissionSchema.pre('save', function (next) {
	var self = this;
	if (this.ipAddr) {
		if (this.isModified('ipAddr') || !this.geoLocation) {
			freegeoip.getLocation(this.ipAddr, function (err, location) {
				if (err) return next(err);
				self.geoLocation = location;
				return next();
			});
		}
	}
	return next();
});

//Generate autofilled PDF if flags are set
FormSubmissionSchema.pre('save', function (next) {
	var fdfData, dest_filename, dest_path,
		self = this,
		_form = this.form;

	if (this.pdf && this.pdf.path) {
		dest_filename = self.title.replace(/ /g, '') + '_submission_' + Date.now() + '.pdf';
		var __path = this.pdf.path.split('/').slice(0, this.pdf.path.split('/').length - 1).join('/');
		dest_path = path.join(__path, dest_filename);

		self.pdfFilePath = dest_path;

		pdfFiller.fillForm(self.pdf.path, dest_path, self.fdfData, function (err) {
			if (err) {
				console.log('\n err.message: ' + err.message);
				return next(new Error(err.message));
			}
			console.log('Field data from Form: ' + self.title.replace(/ /g, '') + ' outputed to new PDF: ' + dest_path);
			return next();
		});
	} else {
		return next();
	}
});

module.exports = FormSubmissionSchema;
