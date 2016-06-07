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
function formFieldsSetter(form_fields){
	for(var i=0; i<form_fields.length; i++){
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

	if(this.hasPlugins.oscarhost){
		mongoose.model('Form').findById(self.form, function(err, _form){
			var form_ids = _.map(_.pluck(_form.form_fields, '_id'), function(id){ return ''+id;}),
				submission_ids = _.pluck(self.form_fields, '_id');

			// console.log('Form form_field ids\n--------');
			// console.log(form_ids);
			// console.log('FormSubmission [form_field ids]\n--------');
			// console.log(submission_ids);

			if(err) return next(err);
			// console.log(_form);
			// console.log('should push to api');
			// console.log( (!this.oscarDemoNum && !!_form.plugins.oscarhost.baseUrl && !!_form.plugins.oscarhost.settings.fieldMap) );
			if(!this.oscarDemoNum && _form.plugins.oscarhost.baseUrl && _form.plugins.oscarhost.settings.fieldMap){
				console.log('OSCARHOST API HOOK');
		 		var url_login = _form.plugins.oscarhost.baseUrl+'/LoginService?wsdl',
		 			url_demo = _form.plugins.oscarhost.baseUrl+'/DemographicService?wsdl';

		 		var args_login = {arg0: config.oscarhost.auth.user, arg1: config.oscarhost.auth.pass};

		 		var options = {
		 		    ignoredNamespaces: {
		 		        namespaces: ['targetNamespace', 'typedNamespace'],
		 		        override: true
		 		    }
		 		};
		 		// console.log(self.form_fields);

		 		//Generate demographics from hashmap
		 		var generateDemo = function(formFields, conversionMap, demographicsTemplate){
		 			console.log('generating Demo fields');
		 			console.log(conversionMap);
		 			var _generatedDemo = {}, currField, propertyName;

		 			for(var y=0; y<formFields.length; y++){
		 				currField = formFields[y];
		 				propertyName = conversionMap[currField._id];

		 				if(demographicsTemplate.hasOwnProperty(conversionMap[currField._id])){
		 					_generatedDemo[propertyName] = currField.fieldValue+'';
		 				}else if(propertyName === 'DOB'){
	 						var date = new Date(currField.fieldValue);
	 						_generatedDemo.dateOfBirth = date.getDate()+'';
	 						_generatedDemo.yearOfBirth = date.getFullYear()+'';
	 						_generatedDemo.monthOfBirth = date.getMonth()+'';
		 				}
		 			}
		 			var currDate = new Date();
		 			var dateString = currDate.toISOString().split('T')[0] + ' ' + currDate.toISOString().split('T')[1].slice(0,8);
		 			_generatedDemo.lastUpdateDate = currDate.toISOString();
		 			return _generatedDemo;
		 		};

		 		var submissionDemographic = generateDemo(self.form_fields, _form.plugins.oscarhost.settings.fieldMap, newDemoTemplate);

		 		console.log(submissionDemographic);
				async.waterfall([
					function (callback) {
						//Authenticate with API
						soap.createClient(url_login, options, function(err, client) {
							client.login(args_login, function (err, result) {
								if(err) return callback(err);
								console.log('SOAP authenticated');
								return callback(null, result.return);
							});
						});
					},

					function (security_obj, callback) {
						//Force Add Demographic
						if(_form.plugins.oscarhost.settings.updateType === 'force_add'){
							soap.createClient(url_demo, options, function(err, client) {
								if(err) return callback(err);
								client.setSecurity(new OscarSecurity(security_obj.securityId, security_obj.securityTokenKey) );

								client.addDemographic({ arg0: submissionDemographic }, function (err, result) {
									console.log('FORCE ADDING DEMOGRAPHIC \n');
									// console.log(result.return);
									if(err) return callback(err);
									return callback(null, result);
								});
							});
						}
					}

				], function(err, result) {
					if(err) return next(err);

					self.oscarDemoNum = parseInt(result.return, 10);
					console.log('self.oscarDemoNum: '+self.oscarDemoNum);
					return next();
				});
			}else{
				return next();
			}
		});
	}else{
		return next();
	}

});

//Check for IP Address of submitting person
FormSubmissionSchema.pre('save', function (next){
	var self = this;
	if(this.ipAddr){
		if(this.isModified('ipAddr') || !this.geoLocation){
			freegeoip.getLocation(this.ipAddr, function(err, location){
				if(err) return next(err);
				//self.geoLocation = JSON.parse(location);
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

	if(this.pdf && this.pdf.path){
		dest_filename = self.title.replace(/ /g,'')+'_submission_'+Date.now()+'.pdf';
		var __path = this.pdf.path.split('/').slice(0,this.pdf.path.split('/').length-1).join('/');
		dest_path = path.join(__path, dest_filename);

		self.pdfFilePath = dest_path;

		pdfFiller.fillForm(self.pdf.path, dest_path, self.fdfData, function(err){
			if(err) {
				console.log('\n err.message: '+err.message);
				return next( new Error(err.message) );
			}
			console.log('Field data from Form: '+self.title.replace(/ /g,'')+' outputed to new PDF: '+dest_path);
			return next();
		});
	} else {
		return next();
	}
});

module.exports = FormSubmissionSchema;
