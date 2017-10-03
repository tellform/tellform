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
	var returnedFields = '_id shortName fullName emailDomain logo';

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

/**
 * Delete an agency
 */
exports.delete = function(req, res) {

	Agency.remove({
		_id: { $in: req.body.agency_ids }
	})
	.exec(function(err) {
		if (err) {
			console.error(err);
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.status(200).send('Agencies successfully deleted');
	});
};

/**
 * Create a new agency
 */
exports.create = function(req, res) {
	if(!req.body.agency){
		return res.status(400).send({
			message: 'Invalid Input'
		});
	}
	var agency = new Agency(req.body.agency);

	agency.save(function(err) {
		if (err) {
			return res.status(405).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		res.json(agency);
	});
};

/**
 * Update an agency
 */

exports.update = function(req, res) {

    Agency.findByIdAndUpdate(req.body.agency._id, { $set: req.body.agency}, function(err, affected, resp) {
		if (err) {
			return res.status(405).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(affected);
	})

};

/**
 * Agency submission authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {

	if (req.user.roles.includes("superAdmin")) {
		return next();
	} else {
		res.status(403).send({
			message: 'User does not have super admin rights'
		});
	}
	
};



