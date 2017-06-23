'use strict';

var passport = require('passport');
var LocalAPIKeyStrategy = require('passport-localapikey-update').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
	passport.use(new LocalAPIKeyStrategy({
		passReqToCallback : true
	}, function(req, apiKey, done) {
		return User.findOne({
			'apiKey': apiKey
		}, function(err, user) {
			if (err)
				return done(err);

			if (!user)
				return done(null, false, {
					message: 'Unknown API Key'
				});

			return done(null, user);
		});
	}));
};
