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

	// console.log(req.files.file);
	// console.log('\n\nProperty Descriptor\n-----------');
	// console.log(Object.getOwnPropertyDescriptor(req.files.file, 'path'));
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
						res.json(pdfFile);
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
		}

		res.status(200).send('Form submissions successfully deleted');
	});
};
/**
 * Submit a form entry
 */
exports.createSubmission = function(req, res) {

	var submission,
		form = req.form, 
		fdfData,
		fdfTemplate, 
		that = this;

	submission = new FormSubmission({
		admin: req.user,
		form_fields: req.body.form_fields,
		timeElapsed: req.body.timeElapsed
	});

	submission.form = form;
	submission.pdf = form.pdf;
	submission.title = form.title;
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
		fdfData = pdfFiller.convFieldJson2FDF(submission.form_fields);
		submission.fdfData = fdfData;
	}else{
		submission.fdfData = undefined;
	}

	submission.save(function(err){
		
		if(err){
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		// console.log(results);
		// console.log(that.form_fields);
		res.status(200).send('Form submission successfully saved');
	});
};

/**
 * Get List of Submissions for a given Form
 */
exports.listSubmissions = function(req, res) {
	var _form = req.form;
	var _user = req.user;
	// console.log(_form);

	// if(_form.submissions.length){
		// res.json(_form.submissions);
	// }else{
		FormSubmission.find({ form: req.form, admin: _user }).populate('admin', 'form').exec(function(err, _submissions) {
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
			// res.status(200).send('Updated forms');
		
		});
	// }
};

/**
 * Create a new form
 */
exports.create = function(req, res) {
	var form = new Form(req.body.form);

	form.admin = req.user;
	// console.log(form);
	// console.log(req.user);

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
	res.json(req.form);
};

/**
 * Update a form
 */
exports.update = function(req, res) { 
	console.log('in form.update()');

	// console.log(req.body.form.form_fields);

	var form = req.form;
	delete req.body.form.__v;
	delete req.body.form._id;
	delete req.body.form.created;
	delete req.body.form.lastModified;
	delete req.body.form.admin;

	// console.log(form.admin);

	//Unless we have 'admin' priviledges, updating form admin is disabled
	if(req.user.roles.indexOf('admin') === -1) delete req.body.form.admin;

	form = _.extend(form, req.body.form);
	// console.log(req.body.form);
	// form.form_fields = req.body.form.form_fields;
	
	form.save(function(err, form) {
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
			if(!form.username){
				form.admin = req.user;
			}
			// console.log(creaform.admin);

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
