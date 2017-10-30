'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function () {
	// Use local strategy
	passport.use(new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password'
		},
		function (username, password, done) {
			User.findOne({
				$or: [
					{'username': username.toLowerCase()},
					{'email': username}
				]
			}, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'Unknown user or invalid password'
					});
				}
				if (!user.authenticate(password)) {
					return done(null, false, {
						message: 'Unknown user or invalid password'
					});
				}

				return done(null, user);
			});
		}
	));
};
