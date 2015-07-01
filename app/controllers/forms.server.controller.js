'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Form = mongoose.model('Form'),
	FormSubmission = mongoose.model('FormSubmission'),
	pdfFiller = require( 'pdffiller' ),
	PDFParser = require('pdf2json/pdfparser'),
	config = require('../../config/config'),
	fs = require('fs-extra'),
	async = require('async'),
	path = require('path'),
	_ = require('lodash');

/**
 * Create a new form manually
 */
exports.create = function(req, res) {
	var form = new Form(req.body);
	form.admin = req.user;

	form.save(function(err) {

		if (err) {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {

			return res.json(form);
		}
	});
};

/**
 * Upload PDF 
 */
var upload_count = 0;
exports.uploadPDF = function(files, user, cb) {
	var parser = new PDFParser();
	console.log("upload count: "+upload_count);
	upload_count++;
	if(files) { 

		console.log('inside uploadPDF');
		console.log(files.file[0]);
		var pdfFile = files.file[0];

		if (pdfFile.size === 0) {
			throw new Error('Files uploaded are EMPTY');
		}
		fs.exists(pdfFile.path, function(exists) { 
			//If file exists move to user's tmp directory
			if(exists) { 

				var newDestination = path.join(config.tmpUploadPath, user.username);
			    var stat = null;
			    try {
			        stat = fs.statSync(newDestination);
			    } catch (err) {
			        fs.mkdirSync(newDestination);
			    }
			    if (stat && !stat.isDirectory()) {
			    	console.log('Directory cannot be created');
			        throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
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

	fdfData = pdfFiller.fillFdfTemplate(fdfTemplate, submission.form_fields, null);

	submission.fdfData = fdfData;

	submission.save(function(err){
		if (err) {
			console.error(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			return res.status(200);
		}            
	});	
};


/**
 * Get List of Submissions for a given Template Form
 */
exports.listSubmissions = function(req, res) {
	var _form = req.form;

	FormSubmission.find({ form: req.form }).populate('admin', 'form').exec(function(err, submissions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			return res.json(submissions);
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
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('updated form');
			return res.json(form);
		}
	});
};

/**
 * Delete a form
 */
exports.delete = function(req, res) {
	var form = req.form;

	form.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			return res.status(200);
			// res.json(form);
		}
	});
};

/**
 * Get List of Template Forms
 */
exports.list = function(req, res) {
	Form.find({ type: 'template' }).sort('-created').populate('admin').exec(function(err, forms) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log(forms);
			return res.json(forms);
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

	Form.findById(id).populate('admin').exec(function(err, form) {
		if (err) return next(err);
		if (!form) {
			return res.status(404).send({
				message: 'Form not found'
			});
		}

		//Remove sensitive information from User object
		form.admin.password = null;
		form.admin.created = null;
		form.admin.salt = null;

		req.form = form;
		next();
	});
};

/**
 * Form authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {

	var form = req.form;

	// console.log('\n\n\nreq.form:\n');
	// console.log(form);
	// console.log('req.user.id: '+req.user.id);

	if (req.form.admin.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
