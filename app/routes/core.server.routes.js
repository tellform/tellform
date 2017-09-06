'use strict';

/**
 * Module dependencies.
 */
var forms = require('../../app/controllers/forms.server.controller'),
	submissions = require('../../app/controllers/submissions.server.controller'),
	core = require('../../app/controllers/core.server.controller'),
	config = require('../../config/config');

module.exports = function(app) {
	// Core routing
	app.route('/')
		.get(core.index);

	app.route('/subdomain/api/')
		.get(core.redoc);

	if(!config.subdomainsDisabled) {
		app.route('/subdomain/:userSubdomain((?!api$)[A-Za-z0-9]+)/')
		 .get(core.form);

		app.route('/subdomain/:userSubdomain((?!api$)[A-Za-z0-9]+)/forms/:formId([a-zA-Z0-9]+)/submissions')
		 .post(submissions.create);

		app.route('/subdomain/:userSubdomain((?!api$)[A-Za-z0-9]+)/forms/:formId([a-zA-Z0-9]+)/render')
		 .get(forms.readForRender);
	} else {
		app.route('/view/')
			.get(core.form);

		app.route('/forms/:formId([a-zA-Z0-9]+)/submissions')
			.post(submissions.create);

		app.route('/forms/:formId([a-zA-Z0-9]+)/render')
			.get(forms.readForRender);
	}
};
