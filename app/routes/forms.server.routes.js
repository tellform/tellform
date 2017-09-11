'use strict';

/**
 * Module dependencies.
 */
var forms = require('../../app/controllers/forms.server.controller'),
	auth = require('../../config/passport_helpers');

module.exports = function(app) {
	// Form Routes
	app.route('/forms')
		.get(auth.isAuthenticatedOrApiKey, forms.list)
		.post(auth.isAuthenticatedOrApiKey, forms.create);

	app.route('/forms/:agency/:formId([a-zA-Z0-9]+)')
		.get(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.read)
		.put(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.update)
		.delete(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.delete);
		
	app.route('/forms/:agency/:formId([a-zA-Z0-9]+)/submitform')
		.get(forms.read);

	app.route('/forms/:agency/:formId([a-zA-Z0-9]+)/duplicate')
		.post(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.duplicate);

	// Finish by binding the form middleware
	app.param('formId', forms.formByID);
};

// viewform and submitform should have different routes
// something to do with changing form_url in the forms.client.service page
