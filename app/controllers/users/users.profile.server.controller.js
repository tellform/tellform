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

	// To improve security we remove the roles from the req.body object
	delete req.body.roles;

	debugger;

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
				user = helpers.removeSensitiveModelData('private_user', user.toJSON());
				res.json(user);
			}
		});
		
	});
};

/**
 * Send User
 */
exports.getUser = function(req, res) {
	var user = helpers.removeSensitiveModelData('private_user', req.user.toJSON());

	return res.json(user);
};
