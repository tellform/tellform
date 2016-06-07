'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	AnonymousStrategy = require('passport-anonymous').Strategy;

module.exports = function() {
	// Use local strategy
	passport.use(new AnonymousStrategy());
};
