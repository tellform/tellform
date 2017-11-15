'use strict';

module.exports = {
	send: function(emailSettings, emailTemplateVars, smtpTransport, varFormat, cb){
		var parsedTemplate = this.parseTemplate(emailSettings.htmlTemplate, emailTemplateVars, varFormat);
		var parsedSubject = this.parseTemplate(emailSettings.subject, emailTemplateVars, varFormat);
		var mailOptions = {
			replyTo: emailSettings.fromEmails,
			from: 'noreply@tellform.com',
			cc: emailSettings.toEmails,
			subject: parsedSubject,
			html: parsedTemplate
		};

		smtpTransport.sendMail(mailOptions, function(){
			cb();
		});
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
			if(field.hasOwnProperty('globalId') && field.hasOwnProperty('fieldValue')){
				formFieldDict[field.globalId] = field.fieldValue;
			}
		});
		return formFieldDict;
	}
};