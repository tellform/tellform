'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	config = require('../../config/config'),
	auth = require('../../config/passport_helpers');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');

	// Setting up the users profile api
	app.route('/users/me').get(auth.isAuthenticatedOrApiKey, users.getUser);
	app.route('/users').put(auth.isAuthenticatedOrApiKey, users.update);
	app.route('/users/accounts').delete(users.requiresLogin, users.removeOAuthProvider);

	// Setting up the users account verification api
	app.route('/auth/verify/:token').get(users.validateVerificationToken);
	app.route('/auth/verify').post(users.resendVerificationEmail);

	// Setting up the users password api
	app.route('/users/password').post(users.requiresLogin, users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	if(!config.signupDisabled) {
        app.route('/auth/signup').post(users.signup);
	}
    app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	app.route('/auth/genkey').get(users.requiresLogin, users.generateAPIKey);
	
	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};
