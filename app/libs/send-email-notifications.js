'use strict';
const jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;

module.exports = {
	send: function(emailSettings, emailTemplateVars, smtpTransport, cb){
		var parsedTemplate = this.parseTemplate(emailSettings.htmlTemplate, emailTemplateVars, false);
		var parsedSubject = this.parseTemplate(emailSettings.subject, emailTemplateVars, true);

		var mailOptions = {
			replyTo: emailSettings.fromEmails,
			from: 'noreply@ohmyform.com',
			cc: emailSettings.toEmails,
			subject: parsedSubject,
			html: parsedTemplate
		};

		smtpTransport.sendMail(mailOptions, function(err){
			cb(err);
		});
	},

	parseTemplate: function(emailTemplate, emailTemplateVars, onlyText){
		var dom = new JSDOM('<!doctype html>'+emailTemplate);

		Object.keys(emailTemplateVars).forEach(function (key) {
			var elem = dom.window.document.querySelector('span.placeholder-tag[data-id=\'' + key + '\']');
			if(elem !== null){
				elem.outerHTML = emailTemplateVars[key];
			}
		});

		if(onlyText){
			return dom.window.document.documentElement.textContent;
		}
		return dom.serialize();
	},

	createFieldDict: function(form_fields){
		var formFieldDict = {};
		form_fields.forEach(function(field){
			if(field.hasOwnProperty('fieldValue') && field.hasOwnProperty('_id')){
				formFieldDict[field._id] = String(field.fieldValue);
			}
		});
		return formFieldDict;
	}
};
