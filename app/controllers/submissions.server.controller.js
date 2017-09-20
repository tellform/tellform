'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	config = require('../../config/config'),
	Submission = mongoose.model('Submission'),
	nodemailer = require('nodemailer'),
	sendmail = require('nodemailer-sendmail-transport'),
	moment = require('moment-timezone'),
	async = require('async');

var transport = nodemailer.createTransport(sendmail());

/**
 * Delete form submissions
 */
exports.delete = function(req, res) {
	Submission.remove({
			form: req.form._id,
			_id: { $in: req.body.submission_ids }
		})
		.exec(function(err) {
			if (err) {
				console.error(err);
				res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}
			res.status(200).send('Form submissions successfully deleted');
		});
};

/**
 * Submit a form entry
 */
exports.create = function(req, res, next) {
	var form = req.form;
	var formData = {};

	for (var i = 0; i < req.body.form_fields.length; i++) {
		var field = req.body.form_fields[i];

		if (field.fieldType === 'statement') {} else if (field.fieldType === 'yes_no') {
			formData[field.title] = field.fieldValue == 'true' ? 'Yes' : 'No';
		} else if (field.fieldType === 'date') {
			formData[field.title] = moment(field.fieldValue).tz('Asia/Singapore').format('DD MMM YYYY');
		} else {
			formData[field.title] = field.fieldValue;
		}
	}

	var newSubmission = new Submission({
		form: form._id,
		respondentEmail: req.body.respondentEmail
	});

	async.waterfall([
		function(done) {
			newSubmission.save(function(err, submission) {
				done(err, submission);
			});
		},
		function(submission, done) {
			res.render('templates/submit-form-email', {
				refNo: submission.id,
				formTitle: form.title,
				submissionTime: moment(submission.created).tz('Asia/Singapore').format('ddd, DD MMM YYYY hh:mm:ss A'),
				formData: formData,
				appName: config.app.title
			}, function(err, emailHTML) {
				done(err, emailHTML, submission);
			});
		},
		function(emailHTML, submission, done) {
			var mailOptions = {
				to: form.emails,
				from: 'FormSG <donotreply@form.sg>',
				subject: 'formsg-auto: ' + form.title + ' (Ref: ' + submission.id + ')',
				html: emailHTML
			};

			transport.sendMail(mailOptions, function(err, info) {
				if (!err) {
					res.send({
						message: 'Form submission email successfully sent to form admin.'
					});
				} else {
					return res.status(400).send({
						message: 'Failure sending form submission email.'
					});
				}

				done(err);
			});
		}
	], function(err) {
		if (err) return next(err);
	});
};

/**
 * Get list of submissions of a form
 */
exports.list = function(req, res) {
	var searchCriteria = getSearchCriteria(req);
	var returnedFields = '_id created';

	var sortField = req.query.sortField;
	var sortDirection = req.query.sortDirection;

	var limit = parseInt(req.query.pageSize);
	var offset = (parseInt(req.query.pageNumber) - 1) * limit;

	var query = Submission.find(searchCriteria, returnedFields);

	if (sortField && sortDirection !== undefined) {
		query = query.sort({ [sortField]: sortDirection });
	}

	if (limit !== undefined && offset !== undefined) {
		query = query.skip(offset).limit(limit);
	}

	query.exec(function(err, _submissions) {
		if (err) {
			console.error(err);
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(_submissions);
	});
};

/**
 * Count number of submissions of a form
 */
exports.count = function(req, res) {
	var searchCriteria = getSearchCriteria(req);
	var query = Submission.find(searchCriteria);

	query.count()
		.exec(function(err, count) {
			if (err) {
				console.error(err);
				res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}
			res.json(count);
		});
};

var getSearchCriteria = function(req) {
	var searchCriteria = { form: req.form._id };

	var startDate = req.query.startDate;
	var endDate = moment(req.query.endDate).add(1, 'days');

	if(startDate && endDate) {
    searchCriteria.created = {
      $gte: new Date(startDate),
      $lt: new Date(endDate)
    }
  } else if(startDate) {
		searchCriteria.created = {
      $gte: new Date(startDate)
    }
	} else if (endDate) {
		searchCriteria.created = {
      $lt: new Date(endDate)
    }
	}

	return searchCriteria;
}

/**
 * Form submission authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	var form = req.form;
	if (req.form.admin.id !== req.user.id && req.user.roles.indexOf('admin') === -1 && 
		req.form.emails.indexOf(req.user.email) < 0) {
		res.status(403).send({
			message: 'User ' + req.user.username + ' is not authorized to edit Form: ' + form.title
		});
	}
	return next();
};
