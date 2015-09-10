'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	pdfFiller = require('node-pdffiller'),
	satelize = require('satelize'),
	_ = require('lodash'),
	config = require('../../config/config'),
	path = require('path'),
	fs = require('fs-extra'),
	Field = mongoose.model('Field'),
	soap = require('soap'),
	OscarSecurity = require('../../scripts/oscarhost/OscarSecurity');
	
var newDemoTemplate = {
		"activeCount": 0, 
		"address": "",
		"alias": "",
		"anonymous": "",
		"chartNo": "",
		"children":"",
		"citizenship":"",
		"city": "",
		"dateJoined": null,
		"dateOfBirth": "",
		"email": "",
		"firstName": "",
		"hin": 9146509343,
		"lastName": "",
		"lastUpdateDate": null,
		"monthOfBirth": "",
		"officialLanguage": "",
		"phone": "",
		"phone2": "",
		"providerNo": 0,
		"province": "",
		"sex": "",
		"spokenLanguage": "",
		"postal": "",
		"yearOfBirth": ""
	};

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
	form_fields: [Field],
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
	percentageComplete: {
		type: Number,
	},

	//TODO: DAVID: Need to not have this hardcoded
	oscarDemoNum: {
		type: Number,
	}

});

//Oscarhost API hook
FormSubmissionSchema.post('save', function (next) {
 	if(this.form.plugins.oscarhost.baseUrl){

 		var url_login = this.form.plugins.oscarhost.baseUrl+'/LoginService?wsdl',
 			url_demo = this.form.plugins.oscarhost.baseUrl+'/DemographicService?wsdl';
 		var options = {
 		    ignoredNamespaces: {
 		        namespaces: ['targetNamespace', 'typedNamespace'],
 		        override: true
 		    }
 		}

 		//Generate demographics from hashmap
 		var generateDemo = function(formFields, conversionMap, templateDemo){
 			var _generatedDemo = {};
 			for(var field in formFields){
 				if(templateDemo.hasOwnProperty(conversionMap[field._id])){
 					var propertyName = conversionMap[field._id];

 					if(propertyName === "unparsedDOB"){
 						var date = Date.parse(field.fieldValue);
 						generatedDemo['dateOfBirth'] = date.getDate();
 						generatedDemo['yearOfBirth'] = date.getFullYear();
 						generatedDemo['monthOfBirth'] = date.getMonth();			
 					}else{
 						generatedDemo[propertyName] = field.fieldValue;
 					}

 				}
 			}
 			return _generatedDemo;
 		}

 		var submissionDemographic = generateDemo(this.form_fields, this.form.plugin.oscarhost.settings.fieldMap);

		async.waterfall([
			function (callback) {	
				//Authenticate with API
				soap.createClient(url_login, options, function(err, client) {
					client.login(args_login, function (err, result) {
						if(err) callback(err);
						callback(null, result.return);
					});
				});
			},

			function (security_obj, callback) {
				//Force Add 
				if(this.plugins.oscarhost.settings.updateType === 'force_add'){
					soap.createClient(url_demo, options, function(err, client) {
						client.setSecurity(new OscarSecurity(security_obj.securityId, security_obj.securityTokenKey) );

						client.addDemographic({ arg0: exampleDemo }, function (err, result) {
							if(err) callback(err);

							callback(null, result);
						});
					});
				}
			},

		], function(err, result) {
			if(err) throw err;
			console.log(result);
			this.oscarDemoNum = parseInt(result.return, 10);
		});	
	}
});

//Check for IP Address of submitting person 
FormSubmissionSchema.pre('save', function (next){
	if(this.ipAddr){
		if(this.isModified('ipAddr')){
			satelize.satelize({ip: this.ipAddr}, function(err, geoData){
				if (err) next( new Error(err.message) );

				this.geoLocation = JSON.parse(geoData);
				next();
			});
		}
	}
	next();
});

//Generate autofilled PDF if flags are set 
FormSubmissionSchema.pre('save', function (next) {
	var fdfData, dest_filename, dest_path,
		that = this,
		_form = this.form;
	

	if(this.pdf && this.pdf.path){
		dest_filename = that.title.replace(/ /g,'')+'_submission_'+Date.now()+'.pdf';
		var __path = this.pdf.path.split('/').slice(0,this.pdf.path.split('/').length-1).join('/');
		dest_path = path.join(__path, dest_filename);

		that.pdfFilePath = dest_path;

		pdfFiller.fillForm(that.pdf.path, dest_path, that.fdfData, function(err){
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

//mongoose.model('FormSubmission', FormSubmissionSchema);
