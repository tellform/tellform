'use strict';
const jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

module.exports = {
	send: function(emailSettings, emailTemplateVars, smtpTransport, cb){
		var parsedTemplate = this.parseTemplate(emailSettings.htmlTemplate, emailTemplateVars);
		var parsedSubject = this.parseTemplate(emailSettings.subject, emailTemplateVars);
		var mailOptions = {
			replyTo: emailSettings.fromEmails,
			from: 'noreply@tellform.com',
			cc: emailSettings.toEmails,
			subject: parsedSubject,
			html: parsedTemplate
		};

		smtpTransport.sendMail(mailOptions, function(err){
			cb(err);
		});
	},

	parseTemplate: function(emailTemplate, emailTemplateVars){
		var dom = new JSDOM('<!doctype html>'+emailTemplate);
		debugger;

		Object.keys(emailTemplateVars).forEach(function (key) {
			var elem = dom.window.document.querySelector("span.placeholder-tag[data-id='" + key + "']");
			if(elem !== null){
				elem.outerHTML = emailTemplateVars[key];
			}
		});

		debugger;
		//Removed unused variables
		//TODO: Currently querySelectorAll not working in JSDOM
		/*
		dom.window.document.querySelectorAll("span[data-id]").forEach(function(elem){
			if(elem !== null){
				elem.outerHTML = '';
			}
		})
		*/
		return dom.serialize();
	},

	createFieldDict: function(form_fields){
		var formFieldDict = {};
		form_fields.forEach(function(field){
			if(field.hasOwnProperty('globalId') && field.hasOwnProperty('fieldValue')){
				formFieldDict[field.globalId+''] = field.fieldValue+'';
			}
		});
		return formFieldDict;
	}
};