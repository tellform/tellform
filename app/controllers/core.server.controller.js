'use strict';

var raven = require('raven');
var config = require('../../config/config');
var client = new raven.Client(config.DSN);


/**
 * Module dependencies.
 */
exports.index = function(req, res, next) {
	// next( throw new Error('Hello, world!'));
	client.captureMessage('Rendering index.html');
	res.render('index', {
		user: req.user || null,
		request: req
	});
};