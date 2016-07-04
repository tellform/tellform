'use strict';

/**
 * Module dependencies.
 */
var forms = require('../../app/controllers/forms.server.controller'),
	core = require('../../app/controllers/core.server.controller');

module.exports = function(app) {
	// Root routing
	app.route('/').get(core.index);
	app.route('/subdomain/([a-zA-Z0-9]+)/').get(core.form);
	app.route('/subdomain/*/forms/:formId([a-zA-Z0-9]+)')
		.get(forms.read)
		.post(forms.createSubmission);
};
