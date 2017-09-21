'use strict';

/**
 * Module dependencies.
 */
var forms = require('../../app/controllers/forms.server.controller'),
	auth = require('../../config/passport_helpers'),
	config = require('../../config/config'),
	core = require('../../app/controllers/core.server.controller');

module.exports = function(app) {
	// Form Routes
	if(!config.subdomainsDisabled) {
		app.route('/subdomain/:userSubdomain((?!api$)[A-Za-z0-9]+)/')
		 .get(core.form);

		app.route('/subdomain/:userSubdomain((?!api$)[A-Za-z0-9]+)/forms/:formId([a-zA-Z0-9]+)')
		 .post(forms.createSubmission);

		app.route('/subdomain/:userSubdomain((?!api$)[A-Za-z0-9]+)/forms/:formId([a-zA-Z0-9]+)/render')
		 .get(forms.readForRender);

		app.route('/forms/:formId([a-zA-Z0-9]+)/render')
			.put(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.readForRender)
			.get(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.readForRender);
	} else {
	    app.route('/view/')
            .get(core.form);
    
    	app.route('/forms/:formId([a-zA-Z0-9]+)/render')
			.get(forms.readForRender);
	}
	app.route('/forms')
		.get(auth.isAuthenticatedOrApiKey, forms.list)
		.post(auth.isAuthenticatedOrApiKey, forms.create);

	app.route('/forms/:formId([a-zA-Z0-9]+)')
		.get(forms.read)
		.post(forms.createSubmission)
		.put(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.update)
		.delete(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.delete);

	app.route('/forms/:formId([a-zA-Z0-9]+)/submissions')
		.get(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.listSubmissions)
		.delete(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.deleteSubmissions);

	// Slower formId middleware
	app.param('formId', forms.formByID);

	// Fast formId middleware
	app.param('formIdFast', forms.formByIDFast);
};
