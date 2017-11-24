'use strict';

/**
 * Module dependencies.
 */
var auth = require('../../../config/passport_helpers');
/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	} else {
		return next();
	}
};
