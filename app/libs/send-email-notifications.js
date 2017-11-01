module.exports = {
	send: function(emailSettings, emailTemplateVars, smtpTransport, varFormat, cb){
		var parsedTemplate = parseTemplate(emailSettings.htmlTemplate, emailTemplateVars);
		var parsedSubject = parseTemplate(emailSettings.body, emailTemplateVars);
		var mailOptions = {
			from: emailSettings.from,
			cc: emailSettings.recipients,
			subject: parsedSubject,
			html: parsedTemplate
		}

		smtpTransport.sendMail(mailOptions, cb);
	},

	parseTemplate: function(emailTemplate, emailAttrs, varFormat){
		var resolvedTemplate = emailTemplate;
		Object.keys(emailAttrs).forEach(function (key) {
		   resolvedTemplate = replaceTemplateVal(key, emailAttrs[key], resolvedTemplate);
		});
		return resolvedTemplate;
	},

	replaceTemplateVal: function(key, val, template, varFormat){
		return template.replace( new RegExp(varFormat[0] + key + varFormat[1], 'g'), value )
	}
}