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


module.exports.hasRole = function hasRole(roleRequired) {
	if (!roleRequired) {
		throw new Error('Required role needs to be set');
	}

	return function(req, res, next) {
		return module.exports.isAuthenticated(req, res, function() {
			if (req.user && req.user.roles && req.user.roles.indexOf(roleRequired) !== -1){
				return next();
			}
			return res.sendStatus(403);
		});
	};
};

module.exports.hasAdminRole = function hasAdminRole() {
	return module.exports.hasRole('admin');
};

