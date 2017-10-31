module.exports = {
	send: function(emailSettings, emailTemplateVars, smtpTransport, cb){
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

	parseTemplate: function(emailTemplate, emailAttrs){
		var resolvedTemplate = emailTemplate;
		Object.keys(emailAttrs).forEach(function (key) {
		   resolvedTemplate = replaceTemplateVal(key, emailAttrs[key], resolvedTemplate);
		});
		return resolvedTemplate;
	},

	replaceTemplateVal: function(key, val, template){
		return template.replace( new RegExp('${' + key + '}', 'g'), value )
	}
}