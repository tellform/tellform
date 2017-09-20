'use strict';

/**
 * Module dependencies.
 */
var forms = require('../../app/controllers/forms.server.controller'),
	core = require('../../app/controllers/core.server.controller');

module.exports = function(app) {
	// Core routing
	app.route('/')
		.get(core.index);

	app.route('/subdomain/api/')
		.get(core.redoc);
};

