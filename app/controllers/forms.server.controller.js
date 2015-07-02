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
 * Create a new form
 */
exports.create = function(req, res) {
	var form = new Form(req.body);
	form.admin = req.user;

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
 * Upload PDF 
 */
exports.uploadPDF = function(files, user, cb) {
	var _user = JSON.parse(''+user);
	console.log(_user.username);
	console.log(config.tmpUploadPath);

<<<<<<< HEAD
	// console.log(pdfFile);

	var form = Form.findById(req.body.form._id);
	// console.log(req.files);
=======
	if(files) { 

		console.log('inside uploadPDF');
		console.log(files.file[0]);
		var pdfFile = files.file[0];
>>>>>>> dev_working

		if (pdfFile.size === 0) {
			throw new Error('Files uploaded are EMPTY');
		}
		fs.exists(pdfFile.path, function(exists) { 
<<<<<<< HEAD
			console.log(pdfFile.path);

			fs.open(pdfFile.path,'r',function(err,fd){
			    if (err && err.code === 'ENOENT') { 
			    	return res.status(400).send({
						message: 'Did NOT get your file!'
					});
			    }
			    return res.status(200); 
			});
=======
			//If file exists move to user's tmp directory
			if(exists) { 

				var newDestination = path.join(config.tmpUploadPath, _user.username);
			    var stat = null;
			    try {
			        stat = fs.statSync(newDestination);
			    } catch (err) {
			        fs.mkdirSync(newDestination);
			    }
			    if (stat && !stat.isDirectory()) {
			    	console.log('Directory cannot be created');
			        throw new Error('Directory cannot be created because an inode of a different type exists at "' + newDestination + '"');
			    }
			    
			    fs.move(pdfFile.path, path.join(newDestination, pdfFile.name), function (err) {
					if (err) {
						throw new Error(err.message);
					}
					pdfFile.path = path.join(newDestination, pdfFile.name);

					return cb(pdfFile);
				});				

			} else { 
				throw new Error('Did NOT get your file!');
			} 
>>>>>>> dev_working
		}); 
	}else {
		throw new Error('File NOT uploaded');
	}

};

/**
 * Show the current form
 */
exports.read = function(req, res) {
	res.json(req.form);
};

/**
 * Submit a form entry
 */
exports.createSubmission = function(req, res) {

	var submission = new FormSubmission(),
		form = req.form, 
		fdfData,
		fdfTemplate;

	submission.form = form;
	submission.admin = req.user;
	submission.form_fields = req.body.form_fields;
	submission.title = req.body.title;
	submission.timeElapsed = req.body.timeElapsed;
	console.log(req.body);
	// submission.ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	if (form.isGenerated){
		fdfTemplate = form.convertToFDF();
	} else {
		try {
			fdfTemplate = pdfFiller.mapForm2PDF(form.convertToFDF(), form.pdfFieldMap);
		} catch(err){
			throw new Error(err.message);
		}
	}

	if(form.autofillPDFs){
		fdfData = pdfFiller.fillFdfTemplate(fdfTemplate, submission.form_fields, null);
		submission.fdfData = fdfData;
	}

	submission.save(function(err){
		if (err) {
			console.error(err);
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('Form Submission CREATED');
			res.status(200).send('Form submission successfully saved');
		}            
	});	
};


/**
 * Get List of Submissions for a given Form
 */
exports.listSubmissions = function(req, res) {
	var _form = req.form;

	FormSubmission.find({ form: req.form }).populate('admin', 'form').exec(function(err, submissions) {
		if (err) {
			console.log(err);
			res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('hello');
			res.json(submissions);
		}
	});
};


/**
 * Update a form
 */
exports.update = function(req, res) {
	
	var form = req.form;
	form = _.extend(form, req.body);
	form.admin = req.user;

	form.save(function(err) {
		if (err) {
			console.log(err);
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('updated form');
			res.json(form);
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
				message: err.message
			});
		} else {
			console.log('Form successfully deleted');
			res.status(200).send('Form successfully deleted');
		}
	});
};

/**
<<<<<<< HEAD
 * Get List of Forms
 */
exports.list = function(req, res) {
	Form.find().sort('-created').populate('admin').exec(function(err, forms) {
=======
 * Get All of Users' Forms
 */
exports.list = function(req, res) {
	//Allow 'admin' user to view all forms
	var searchObj = {admin: req.user};
	if(req.user.isAdmin()) searchObj = {};

	Form.find({}).sort('-created').populate('admin').exec(function(err, forms) {
>>>>>>> dev_working
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

	Form.findById(id).populate('admin').exec(function(err, form) {
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
