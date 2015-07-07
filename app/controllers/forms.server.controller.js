'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Form = mongoose.model('Form'),
	FormSubmission = mongoose.model('FormSubmission'),
	pdfFiller = require( 'pdffiller' ),
	config = require('../../config/config'),
	fs = require('fs-extra'),
	async = require('async'),
	path = require('path'),
	_ = require('lodash');

/**
 * Upload PDF 
 */
exports.uploadPDF = function(req, res, next) {

	console.log('inside uploadPDF');
	if(req.files){
		var pdfFile = req.files.file;
		var _user = req.user;
		if (req.files.size === 0) {
			next(new Error('File uploaded is EMPTY'));
		}else if(req.files.size > 200000000){
			next(new Error('File uploaded exceeds MAX SIZE of 200MB'));
		}else {
			fs.exists(pdfFile.path, function(exists) { 
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
				        next(new Error('Directory cannot be created because an inode of a different type exists at "' + newDestination + '"'));
				    }
				    
				    fs.move(pdfFile.path, path.join(newDestination, pdfFile.name), function (err) {
						if (err) {
							next(new Error(err.message));
						}
						pdfFile.path = path.join(newDestination, pdfFile.name);
						console.log(pdfFile.name + ' uploaded to ' + pdfFile.path);
						res.status(200).send('pdf file successfully uploaded');
					});				

				} else { 
					next(new Error('Did NOT get your file!'));
				} 
			}); 
		}
	}else {
		next(new Error('Uploaded files were NOT detected'));
	}
};

/**
 * Submit a form entry
 */
exports.createSubmission = function(req, res) {

	var submission = new FormSubmission(),
		form = req.form, 
		fdfData,
		fdfTemplate, 
		that = this;

	submission.form = form;
	submission.admin = req.user;
	submission.form_fields = req.body.form_fields;
	submission.title = req.body.title;
	submission.timeElapsed = req.body.timeElapsed;
	// console.log(req.body);s
	// submission.ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	if(form.autofillPDFs){
		if (form.isGenerated){
			fdfTemplate = form.generateFDFTemplate();
		} else {
			try {
				fdfTemplate = pdfFiller.mapForm2PDF(form.generateFDFTemplate(), form.pdfFieldMap);
			} catch(err){
				res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}
		}
		fdfData = pdfFiller.fillFdfTemplate(fdfTemplate, submission.form_fields, null);
		submission.fdfData = fdfData;
	}

	async.series([
		function(callback){
			submission.save(function(err){
				if (err) {
					callback(err);
				} else {
					callback(null);
				}            
			});	
		},
		function(callback){
			//Add submission to Form.submissionns
			form.submissions.push(submission);
			
			form.save(function(err){
				if (err) {
					callback(err);
				} else {
					callback(null);
				}            
			});	
		},
	], function(err, results) {
			if(err){
				res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}
			console.log(results);
			console.log(that.form_fields);
			res.status(200).send('Form submission successfully saved');
		});
};

/**
 * Get List of Submissions for a given Form
 */
exports.listSubmissions = function(req, res) {
	var _form = req.form;

	// if(_form.submissions.length){
		// res.json(_form.submissions);
	// }else{
		FormSubmission.find({ form: req.form }).populate('admin', 'form').exec(function(err, _submissions) {
			if (err) {
				console.log(err);
				res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				// _form.submissions = _submissions;
				_form.update({ $set : { submissions: _submissions }});
				res.status(200);
			}
		});
	// }
};

/**
 * Create a new form
 */
exports.create = function(req, res) {
	var form = new Form(req.body.form);

	form.admin = req.user;
	console.log(form);
	console.log(req.user);

	form.save(function(err) {
		if (err) {
			console.log(err);
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(200).send('form created');
		}
	});
};


/**
 * Show the current form
 */
exports.read = function(req, res) {
	res.json(req.form);
};

/**
 * Update a form
 */
exports.update = function(req, res) { 
	console.log('in form.update()');

	var form = req.form;
	form = _.extend(form, req.body.form);
	form.admin = req.user;

	form.save(function(err) {
		if (err) {
			console.log(err);
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('updated form');
			res.status(200).send('updated form');
		}
	});
};

/**
 * Delete a form
 */
exports.delete = function(req, res) {
	var form = req.form;
	console.log('deleting form');
	Form.remove({_id: form._id}, function(err) {
		if (err) {
			res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('Form successfully deleted');
			res.status(200).send('Form successfully deleted');
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
		res.status(400).send({
			message: 'Form is invalid'
		});
	}

	Form.findById(id).populate('admin', 'submissions').exec(function(err, form) {
		if (err) {
			return next(err);
		} else if (!form || form === null) {
			res.status(404).send({
				message: 'Form not found'
			});
		}
		else {
			if(!form.admin){
				form.admin = req.user;
				form.save(function(err) {
					if (err) {
						console.log(err);
						res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						//Remove sensitive information from User object
						form.admin.password = null;
						form.admin.created = null;
						form.admin.salt = null;

						req.form = form;
						next();
					}
				});
			}

			console.log(form.submissions);

			//Remove sensitive information from User object
			form.admin.password = null;
			form.admin.created = null;
			form.admin.salt = null;

			req.form = form;
			next();
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
			message: 'User '+req.user.username+' is not authorized'
		});
	}
	next();
};
