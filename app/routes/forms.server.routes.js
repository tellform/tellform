'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	forms = require('../../app/controllers/forms.server.controller');

module.exports = function(app) {
	// Form Routes
	app.route('/upload/pdf')
		.post(forms.uploadPDF);

	app.route('/forms')
		.get(forms.list)
		.post(users.requiresLogin, forms.create);

	app.route('/forms/:formId')
		.get(forms.read)
		.post(forms.createSubmission)
		.put(users.requiresLogin, forms.hasAuthorization, forms.update)
		.delete(users.requiresLogin, forms.delete);

	// Finish by binding the form middleware
	app.param('formId', forms.formByID);
};
