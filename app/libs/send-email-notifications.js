'use strict';

const constants = require('./constants');

module.exports = {
	send: function(emailSettings, emailTemplateVars, smtpTransport, varFormat, cb){
		var parsedTemplate = this.parseTemplate(emailSettings.htmlTemplate, emailTemplateVars);
		var parsedSubject = this.parseTemplate(emailSettings.body, emailTemplateVars);
		var mailOptions = {
			from: emailSettings.from,
			cc: emailSettings.recipients,
			subject: parsedSubject,
			html: parsedTemplate
		};

		smtpTransport.sendMail(mailOptions, cb);
	},

	parseTemplate: function(emailTemplate, emailAttrs, varFormat){
		var resolvedTemplate = emailTemplate;
		var that = this;
		Object.keys(emailAttrs).forEach(function (key) {
		   resolvedTemplate = that.replaceTemplateVal(key, emailAttrs[key], resolvedTemplate, varFormat);
		});
		return resolvedTemplate;
	},

	replaceTemplateVal: function(key, val, template, varFormat){
		return template.replace( new RegExp(varFormat[0] + key + varFormat[1], 'g'), val);
	},

	createFieldDict: function(form_fields){
		var formFieldDict = {};
		form_fields.forEach(function(field){
			if(field.hasOwnProperty('_id') && field.hasOwnProperty('fieldValue')){
				formFieldDict[field._id] = field.fieldValue;
			}
		});
		return formFieldDict;
	}
};