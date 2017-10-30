'use strict';

var passport = require('passport');

module.exports.isAuthenticatedOrApiKey = function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	// Try authenticate with API KEY
	if (req.headers.apikey || req.query.apikey || req.body.apikey) {
		passport.authenticate('localapikey', function (err, user, info) {
			if (err)
				return res.sendStatus(500);

			if (!user)
				return res.status(401).send(info.message || '');

			req.login(user, function(loginErr) {
				if (loginErr) return res.sendStatus(500);

				req.user = user;
				return next();
			});

		})(req, res, next);
	} else {
		return res.sendStatus(401);
	}
};

