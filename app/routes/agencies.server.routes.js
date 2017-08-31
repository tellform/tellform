'use strict';

/**
 * Module dependencies.
 */
var agencies = require('../../app/controllers/agencies.server.controller');

module.exports = function(app) {
	// Agency Routes
	app.route('/agencies').get(agencies.list);
};
