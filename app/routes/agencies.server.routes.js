'use strict';

/**
 * Module dependencies.
 */
var agencies = require('../../app/controllers/agencies.server.controller');

module.exports = function(app) {
	// Agency Routes
	app.route('/agencies')
		.get(agencies.hasAuthorization, agencies.list)
		.put(agencies.hasAuthorization, agencies.update)
		.delete(agencies.hasAuthorization, agencies.delete)
		.post(agencies.hasAuthorization, agencies.create);
};
