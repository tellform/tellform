'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	forms = require('../../app/controllers/forms.server.controller'),
	multer = require('multer'),
	config = require('../../config/config');

// Setting the pdf upload route and folder
var upload = multer({ dest: config.tmpUploadPath,
		rename: function (fieldname, filename) {
		    return Date.now();
		},
		onFileUploadStart: function (file) {
			//Check to make sure we can only upload images and pdfs
		  	console.log(file.originalname + ' is starting ...');
		},
		onFileUploadComplete: function (file, req, res) {
			console.log(file.originalname + ' uploaded to  ' + file.path);
		}
	});

module.exports = function(app) {
	// Form Routes
	app.route('/upload/pdf')
		.post(users.requiresLogin, upload.single('file'), forms.uploadPDF);

	app.route('/forms')
		.get(users.requiresLogin, forms.list)
		.post(users.requiresLogin, forms.create);

	app.route('/forms/:formId([a-zA-Z0-9]+)')
		.get(forms.read)
		.post(forms.createSubmission)
		.put(users.requiresLogin, forms.hasAuthorization, forms.update)
		.delete(users.requiresLogin, forms.hasAuthorization, forms.delete);

	app.route('/forms/:formId([a-zA-Z0-9]+)/submissions')
		.get(forms.listSubmissions)
		.delete(users.requiresLogin, forms.hasAuthorization, forms.deleteSubmissions);

	// Finish by binding the form middleware
	app.param('formId', forms.formByID);
};
