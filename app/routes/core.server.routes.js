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

	app.route('/view/')
		.get(core.form);

	app.route('/forms/:agency([a-zA-Z0-9]+)/:formId([a-zA-Z0-9]+)/submissions')
		.post(submissions.create);

};
