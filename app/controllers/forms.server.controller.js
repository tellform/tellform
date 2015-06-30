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
exports.uploadPDF = function(req, res) {
	var parser = new PDFParser(),
		pdfFile = req.files.file;

	console.log(pdfFile);

	var form = Form.findById(req.body.form._id);
	console.log(req.files);

	if (req.files) { 
		
		if (pdfFile.size === 0) {
			return res.status(400).send({
				message: 'Hey, first would you select a file?'
			});
		}
		fs.exists(pdfFile.path, function(exists) { 
			if(exists) { 
				// console.log('UPLOADING FILE \N\N');
				return res.status(200).send({
					message: 'Got your file!'
				}); 
			} else { 
				return res.status(400).send({
					message: 'Did NOT get your file!'
				});
			} 
		}); 
	} 

	return res.status(400).send({
		message: 'FILE NOT UPLOADED'
	});
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

	//Create new file
	// pdfFiller.fillForm( form.pdf.path, config.pdfUploadPath+form.title+'/'+form.title+'_'+Date.now()+'_submission.pdf', fdfData, function() { 
		// console.log('\n\n\n fdfData');
		// console.log(fdfData);
		// console.log('\n\n\n :\n');
		// console.log(req.body);

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
	// });
};


/**
 * Get List of Submissions for a given Template Form
 */
exports.listSubmissions = function(req, res) {
	var _form = req.form;

	FormSubmission.find({ form: req.form }).exec(function(err, submissions) {
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
