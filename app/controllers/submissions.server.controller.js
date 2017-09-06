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
 * Delete a form submission
 */
exports.delete = function(req, res) {

	var submission_id_list = req.body.deleted_submissions,
		form = req.form;

	Submission.remove({
		form: req.form,
		admin: req.user,
		_id: {
			$in: submission_id_list
		}
	}, function(err) {

		if (err) {
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
			return;
		}

		form.save(function(formSaveErr) {
			if (formSaveErr) {
				res.status(400).send({
					message: errorHandler.getErrorMessage(formSaveErr)
				});
				return;
			}
			res.status(200).send('Form submissions successfully deleted');

		});
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
				from: 'Form.sg <donotreply@form.sg>',
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
	var _form = req.form;

	Submission.find({
		form: _form._id
	}).exec(function(err, _submissions) {
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

};

/**
 * Form submission authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	var form = req.form;
	if (req.form.admin.id !== req.user.id && req.user.roles.indexOf('admin') === -1) {
		res.status(403).send({
			message: 'User ' + req.user.username + ' is not authorized to edit Form: ' + form.title
		});
	}
	return next();
};
