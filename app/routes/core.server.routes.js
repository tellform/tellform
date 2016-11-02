'use strict';

/**
 * Module dependencies.
 */
var forms = require('../../app/controllers/forms.server.controller'),
	core = require('../../app/controllers/core.server.controller');

module.exports = function(app) {
	// Core routing
	app.route('/').get(core.index);

	app.route('/subdomain/api/').get(core.redoc);
	app.route('/subdomain/:userSlug((?!api$)[A-Za-z0-9]+)/').get(core.form);
	app.route('/subdomain/:userSlug((?!api$)[A-Za-z0-9]+)/forms/:formId([a-zA-Z0-9]+)').get(forms.read)
		.post(forms.createSubmission);
};
