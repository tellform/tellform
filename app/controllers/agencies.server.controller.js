'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Agency = mongoose.model('Agency');

/**
 * Get all agencies
 */
exports.list = function(req, res) {
	var returnedFields = '_id shortName fullName emailDomain';

	Agency.find({}, returnedFields).sort('fullName').exec(function(err, agencies) {
		if (err) {
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(agencies);
		}
	});
};
