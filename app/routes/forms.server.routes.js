'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	forms = require('../../app/controllers/forms.server.controller');

module.exports = function(app) {
	// Form Routes
	app.route('/upload/pdf')
		.post(users.requiresLogin, forms.uploadPDF);

	app.route('/forms')
		.get(users.requiresLogin, forms.list)
		.post(users.requiresLogin, forms.create);

	app.route('/forms/:formId([a-zA-Z0-9]+)')
		.get(forms.read)
		.post(forms.createSubmission)
		.put(users.requiresLogin, forms.hasAuthorization, forms.update)
		.delete(users.requiresLogin, forms.hasAuthorization, forms.delete);

	app.route('/forms/:formId([a-zA-Z0-9]+)/submissions')
		.get(forms.listSubmissions);

	// Finish by binding the form middleware
	app.param('formId', forms.formByID);
};
