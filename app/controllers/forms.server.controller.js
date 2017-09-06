'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Form = mongoose.model('Form'),
	Agency = mongoose.model('Agency'),
	FormSubmission = mongoose.model('FormSubmission'),
	config = require('../../config/config'),
	nodemailer = require('nodemailer'),
	sendmail = require('nodemailer-sendmail-transport'),
	moment = require('moment-timezone'),
	diff = require('deep-diff'),
	async = require('async'),
	_ = require('lodash');

var transport = nodemailer.createTransport(sendmail());

/**
 * Delete a forms submissions
 */
exports.deleteSubmissions = function(req, res) {

	var submission_id_list = req.body.deleted_submissions,
		form = req.form;

	FormSubmission.remove({ form: req.form, admin: req.user, _id: {$in: submission_id_list} }, function(err){

		if(err){
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
			return;
		}

		form.save(function(formSaveErr){
			if(formSaveErr){
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
exports.createSubmission = function(req, res, next) {
	var form = req.form;
	var formData = {};

	for(var i=0; i<req.body.form_fields.length; i++){
		var field = req.body.form_fields[i];

		if(field.fieldType === 'statement'){
		} else if(field.fieldType === 'yes_no') {
			formData[field.title] = field.fieldValue == 'true' ? 'Yes' : 'No';
		} else if(field.fieldType === 'date') {
			formData[field.title] = moment(field.fieldValue).tz('Asia/Singapore').format('DD MMM YYYY');
		} else {
			formData[field.title] = field.fieldValue;
		}
	}

	var newSubmission = new FormSubmission({
		form: form._id,
		respondentEmail: req.body.respondentEmail
	});

	async.waterfall([
		function(done) {
			newSubmission.save(function(err, submission){
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
 * Get List of Submissions for a given Form
 */
exports.listSubmissions = function(req, res) {
	var _form = req.form;

	FormSubmission.find({ form: _form._id }).exec(function(err, _submissions) {
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
 * Create a new form
 */
exports.create = function(req, res) {
	if(!req.body.form){
		return res.status(400).send({
			message: 'Invalid Input'
		});
	}
	var form = new Form(req.body.form);

	form.admin = req.user._id;
	form.emails = req.user.email;

	form.save(function(err) {
		if (err) {
			return res.status(405).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		res.json(form);
	});
};

/**
 * Show the current form
 */
exports.read = function(req, res) {

	if(!req.user || (req.form.admin.id !== req.user.id) ){
		readForRender(req, res);
	} else {
		FormSubmission.find({ form: req.form._id }).exec(function(err, _submissions) {
			if (err) {
				res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}

			var newForm = req.form.toJSON();
			newForm.submissions = _submissions;

			if (req.userId) {
				if(req.form.admin._id+'' === req.userId+''){
					return res.json(newForm);
				}
				return res.status(404).send({
					message: 'Form Does Not Exist'
				});
			}
			return res.json(newForm);
		});
	}
	
};

/**
 * Upload temp file for submissions
 */
exports.uploadTemp = function(req, res) {
	//Send uploaded file data back to form
	res.json(req.file);
};

/**
 * Show the current form for rendering form live
 */
var readForRender = exports.readForRender = function(req, res) {
	var newForm = req.form.toJSON();
	if (!newForm.isLive && !req.user) {
		return res.status(401).send({
			message: 'Form is Not Public'
		});
	}

	//Remove extraneous fields from form object
	delete newForm.admin;

	if(!newForm.startPage.showStart){
		delete newForm.startPage;
	}

	return res.json(newForm);
};

/**
 * Update a form
 */
exports.update = function(req, res) {
	var form = req.form;
    var updatedForm = req.body.form;

    delete updatedForm.__v;
    delete updatedForm.created;

	if (req.body.changes) {
		var formChanges = req.body.changes;

		formChanges.forEach(function (change) {
			diff.applyChange(form, true, change);
		});
	} else {
		//Unless we have 'admin' privileges, updating form admin is disabled
		if(updatedForm && req.user.roles.indexOf('admin') === -1) {
			delete updatedForm.admin;
		}

		//Do this so we can create duplicate fields
		var checkForValidId = new RegExp('^[0-9a-fA-F]{24}$');
		for(var i=0; i<req.body.form.form_fields.length; i++){
			var field = req.body.form.form_fields[i];
			if(!checkForValidId.exec(field._id+'')){
				delete field._id;
			}
		}
		form = _.extend(form, updatedForm);
	}

	form.save(function(err, savedForm) {
		if (err) {
			console.log(err);
            res.status(405).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(savedForm);
		}
	});
};

/**
 * Delete a form
 */
exports.delete = function(req, res) {
	var form = req.form;
	Form.remove({_id: form._id}, function(err) {
		if (err) {
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(form);
		}
	});
};

/**
 * Duplicate a form
 */
exports.duplicate = function(req, res) {
	var id = req.form._id;
	var copy_num = req.body.name

	Form.findById({_id: id}).exec(function(err, form) {
		if (err) {
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			form._id = mongoose.Types.ObjectId();

			form.isNew = true;
			form.title = form.title + '_' + copy_num;

			form.save(function(err, form) {
				if (err) {
					return res.status(405).send({
						message: errorHandler.getErrorMessage(err)
					});
				}

				res.json(form.getMainFields());
			});
		}
	});
};

/**
 * Get All of Users' Forms
 */
exports.list = function(req, res) {
	//Allow 'admin' user to view all forms
	var searchObj = {admin: req.user};
	var returnedFields = '_id title isLive';

	if(req.user.isAdmin()) searchObj = {};

	Form.find(searchObj, returnedFields).sort('title').populate('admin').exec(function(err, forms) {
			if (err) {
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(forms);
		}
	});
};

/**
 * Form middleware
 */
exports.formByID = function(req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Form is invalid'
		});
	}

	Form.findById(id).populate({
		path: 'admin',
		populate: {
			path: 'agency',
			model: 'Agency'
		}
	}).exec(function(err, form) {
		if (err) {
			return next(err);
		} else if (!form || form === null) {
			res.status(404).send({
				message: 'Form not found'
			});
		}
		else {
			//Remove sensitive information from User object
			var _form = form;
			_form.admin.password = null;
			_form.admin.salt = null;
			_form.provider = null;
			req.form = _form;

			if (req.params.agency == req.form.admin.agency.shortName) {
				return next();
			} else {
				res.status(404).send({
				message: 'Agency does not match'
				})
			}
		}
	});
};

/**
 * Form authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	var form = req.form;
	if (req.form.admin.id !== req.user.id && req.user.roles.indexOf('admin') === -1) {
		res.status(403).send({
			message: 'User '+req.user.username+' is not authorized to edit Form: '+form.title
		});
	}
	return next();
};
