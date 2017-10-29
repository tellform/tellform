'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	helpers = require('../helpers.server.controller');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();

		user.save(function(err) {
			if (err) {
				return res.status(500).send({
					message: errorHandler.getErrorMessage(err)
				});
			} 
			req.login(user, function(loginErr) {
				if (err) {
					res.status(500).send(loginErr);
				} else {
					user = helpers.removeSensitiveModelData('private_user', user);
					res.json(user);
				}
			});
			
		});
	} else {
		res.status(401).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.getUser = function(req, res) {
	var _user = helpers.removeSensitiveModelData('private_user', req.user);

	res.json(_user);

	res.end();
};
