'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Form = mongoose.model('Form'),
	FormSubmission = mongoose.model('FormSubmission'),
	pdfFiller = require('pdffiller'),
	config = require('../../config/config'),
	fs = require('fs-extra'),
	async = require('async'),
	path = require('path'),
	_ = require('lodash');

/**
 * Upload PDF
 */
exports.uploadPDF = function(req, res, next) {

	if(req.file){
		var pdfFile = req.file;
		var _user = req.user;
		var _path = req.file.path;


		if (req.file.size === 0) {
			return next(new Error('File uploaded is EMPTY'));
		}else if(req.file.size > 100000000){
			return next(new Error('File uploaded exceeds MAX SIZE of 100MB'));
		}else {
			fs.exists(_path, function(exists) {

				//If file exists move to user's tmp directory
				if(exists) {

					var newDestination = config.tmpUploadPath+_user.username;
				    var stat = null;
				    try {
				        stat = fs.statSync(newDestination);
				    } catch (err) {
				        fs.mkdirSync(newDestination);
				    }

				    if (stat && !stat.isDirectory()) {
				    	console.log('Directory cannot be created');
				        return next(new Error('Directory cannot be created because an inode of a different type exists at "' + newDestination + '"'));
				    }

					console.log(path.join(newDestination, pdfFile.filename));

					fs.move(pdfFile.path, path.join(newDestination, pdfFile.filename), function (err) {
						if (err) {
							return next(new Error(err.message));
						}
						pdfFile.path = path.join(newDestination, pdfFile.filename);
						console.log(pdfFile.filename + ' uploaded to ' + pdfFile.path);
						res.json(pdfFile);
					});

				} else {
					return next(new Error('Did NOT get your file!'));
				}
			});
		}
	}else {
		return next(new Error('Uploaded files were NOT detected'));
	}
};

/**
 * Upload PDF
 */
/*
exports.uploadSubmissionFile = function(req, res, next) {

	console.log('inside uploadPDF');

	// console.log('\n\nProperty Descriptor\n-----------');
	// console.log(Object.getOwnPropertyDescriptor(req.files.file, 'path'));

	console.log(req.files);

	if(req.files){
		var file, _user, _path;

		for(var i=0; i<req.files.length; i++){
			file = req.files[i];
			_user = req.user;
			_path = file.path;


			if (file.size === 0) {
				return next(new Error('File uploaded is EMPTY'));
			}else if(file.size > 100000000){
				return next(new Error('File uploaded exceeds MAX SIZE of 100MB'));
			}else {
				fs.exists(_path, function(exists) {

					//If file exists move to user's form directory
					if(exists) {
						var newDestination = config.tmpUploadPath+_user.username;
						var stat = null;
						try {
							stat = fs.statSync(newDestination);
						} catch (err) {
							fs.mkdirSync(newDestination);
						}

						if (stat && !stat.isDirectory()) {
							console.log('Directory cannot be created');
							return next(new Error('Directory cannot be created because an inode of a different type exists at "' + newDestination + '"'));
						}

						console.log(path.join(newDestination, pdfFile.filename));

						fs.move(pdfFile.path, path.join(newDestination, pdfFile.filename), function (err) {
							if (err) {
								return next(new Error(err.message));
							}
							pdfFile.path = path.join(newDestination, pdfFile.filename);
							console.log(pdfFile.filename + ' uploaded to ' + pdfFile.path);
							res.json(pdfFile);
						});

					} else {
						return next(new Error('Did NOT get your file!'));
					}
				});
			}
		}

	}else {
		return next(new Error('Uploaded files were NOT detected'));
	}
};
*/

/**
 * Delete a forms submissions
 */
exports.deleteSubmissions = function(req, res) {
	console.log(req.body);

	var submission_id_list = req.body.deleted_submissions,
		form = req.form;

	FormSubmission.remove({ form: req.form, admin: req.user, _id: {$in: submission_id_list} }, function(err){

		if(err){
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
			return;
		}

		form.analytics.visitors = [];
		form.save(function(err){
			if(err){
				res.status(400).send({
					message: errorHandler.getErrorMessage(err)
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
exports.createSubmission = function(req, res) {

	var form = req.form;

	var submission = new FormSubmission({
		admin: req.form.admin._id,
		form: req.form._id,
		title: req.form.title,
		form_fields: req.body.form_fields,
		timeElapsed: req.body.timeElapsed,
		percentageComplete: req.body.percentageComplete
	});

	if(!!form.plugins.oscarhost.baseUrl) submission.hasPlugins.oscarhost = true;

	if(form.pdf) submission.pdf = form.pdf;

	//Save submitter's IP Address
	if(req.headers['x-forwarded-for'] || req.connection.remoteAddress){
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		if(ip && process.env.NODE_ENV !== 'development') submission.ipAddr = ip;
	}

	if(req.device){
		submission.device = req.device;
	}

	if(form.autofillPDFs){
		try {
			submission.fdfData = pdfFiller.convFieldJson2FDF(submission.form_fields);
		} catch(err){
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	}else{
		submission.fdfData = null;
	}

	submission.save(function(err, submission){
		if(err){
			console.log(err.message);
			res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.status(200).send('Form submission successfully saved');
	});
};

/**
 * Get List of Submissions for a given Form
 */
exports.listSubmissions = function(req, res) {
	var _form = req.form;
	var _user = req.user;
	console.log('listSubmissions');

	FormSubmission.find({ form: _form._id }).exec(function(err, _submissions) {
		if (err) {
			console.log(err);
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		_form.update({ $set : { submissions: _submissions }}).exec(function(err, form){
			if (err) {
				console.log(err);
				res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}
			res.json(_submissions);
		});

	});

};

/**
 * Create a new form
 */
exports.create = function(req, res) {
	var form = new Form(req.body.form);

	form.admin = req.user._id;
	console.log('Create a new form');
	console.log(form);
	console.log(req.body.form);
	console.log(req.user);

	form.save(function(err) {
		if (err) {
			console.log(err);
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(form);
		}
	});
};

/**
 * Show the current form
 */
exports.read = function(req, res) {
	var validUpdateTypes= Form.schema.path('plugins.oscarhost.settings.updateType').enumValues;

	var newForm = req.form.toJSON({virtuals : true});
	newForm.plugins.oscarhost.settings.validUpdateTypes = validUpdateTypes;


	if (req.userId) {
		if(req.form.admin._id+'' === req.userId+''){
			return res.json(newForm);
		}
		return res.status(404).send({
			message: 'Form Does Not Exist'
		});
	}

	return res.status(404).send({
		message: 'Form Does Not Exist'
	});

};

/**
 * Update a form
 */
exports.update = function(req, res) {
	var form = req.form;
	delete req.body.form.__v;
	delete req.body.form._id;

	//Unless we have 'admin' priviledges, updating form admin is disabled
	if(req.user.roles.indexOf('admin') === -1) delete req.body.form.admin;

	//Do this so we can create duplicate fields
	var checkForValidId = new RegExp('^[0-9a-fA-F]{24}$');
	for(var i=0; i<req.body.form.form_fields.length; i++){
		var field = req.body.form.form_fields[i];
		if(!checkForValidId.exec(field._id+'')){
			delete field._id;
		}
	}

	form = _.extend(form, req.body.form);

	form.save(function(err, form) {
		if (err) {
			console.log(err);
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(form);
		}
	});
};

/**
 * Delete a form
 */
exports.delete = function(req, res) {
	var form = req.form;
	// console.log('deleting form');
	Form.remove({_id: form._id}, function(err) {
		if (err) {
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// console.log('Form successfully deleted');
			// res.status(200).send('Form successfully deleted');
			res.json(form);
		}
	});
};

/**
 * Get All of Users' Forms
 */
exports.list = function(req, res) {
	//Allow 'admin' user to view all forms
	var searchObj = {admin: req.user};
	if(req.user.isAdmin()) searchObj = {};

	Form.find(searchObj).sort('-created').populate('admin.username', 'admin._id').exec(function(err, forms) {
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
	} else {
		Form.findById(id).populate('admin').populate('submissions').exec(function(err, form) {
			if (err) {
				return next(err);
			} else if (form === undefined || form === null) {
				res.status(400).send({
					message: 'Form not found'
				});
			}
			else {
				//Remove sensitive information from User object
				var _form = form;
				_form.admin.password = undefined;
				_form.admin.salt = undefined;
				_form.provider = undefined;

				req.form = _form;
				return next();
			}
		});
	}
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
