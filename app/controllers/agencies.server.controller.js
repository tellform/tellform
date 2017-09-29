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

/**
 * Delete an agency
 */
exports.delete = function(req, res) {
	var agency = req.agency;
	Agency.remove({_id: agency._id}, function(err) {
		if (err) {
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(agency);
		}
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


	console.log(req.body.agency_id)
	console.log(req.body.agency_field)
	var options = { multi: false }


    Agency.update({shortName: 'ava'}, { $set:{ fullName: 'wowzers' }}, options, function(err, affected, resp) {
	   console.log('agency updated')
	   console.log(resp);
	   console.log(err);
	   console.log(affected)
	})


};



