'use strict';

/**
 * Module dependencies.
 */
var agency = require('../../app/controllers/agency.server.controller');

module.exports = function(app) {
	// Agency Routes
	app.route('/agencies')
		.get(agency.list)
		.put(agency.hasAuthorization, agency.update)
		.delete(agency.hasAuthorization, agency.delete)
		.post(agency.hasAuthorization, agency.create);
};
