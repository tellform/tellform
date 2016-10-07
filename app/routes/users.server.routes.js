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

	// // Setting the facebook oauth routes
	// app.route('/auth/facebook').get(passport.authenticate('facebook', {
	// 	scope: ['email']
	// }));
	// app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	// // Setting the twitter oauth routes
	// app.route('/auth/twitter').get(passport.authenticate('twitter'));
	// app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	// // Setting the google oauth routes
	// app.route('/auth/google').get(passport.authenticate('google', {
	// 	scope: [
	// 		'https://www.googleapis.com/auth/userinfo.profile',
	// 		'https://www.googleapis.com/auth/userinfo.email'
	// 	]
	// }));
	// app.route('/auth/google/callback').get(users.oauthCallback('google'));

	// // Setting the linkedin oauth routes
	// app.route('/auth/linkedin').get(passport.authenticate('linkedin'));
	// app.route('/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

	// // Setting the github oauth routes
	// app.route('/auth/github').get(passport.authenticate('github'));
	// app.route('/auth/github/callback').get(users.oauthCallback('github'));

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};
