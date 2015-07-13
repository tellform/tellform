'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res, next) {
	// res.send('Hello World');
    next(new Error("Bump!"));
	res.render('index', {
		user: req.user || null,
		request: req
	});
};
