'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	forms = require('../../app/controllers/forms.server.controller'),
	multer = require('multer'),
	config = require('../../config/config'),
	auth = require('../../config/passport_helpers');

// Setting the pdf upload route and folder
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, config.tmpUploadPath);
	},
	filename: function (req, file, cb) {
		var len = file.originalname.split('.').length;
		var ext = file.originalname.split('.')[len-1];
		cb(null, Date.now()+ '-' + file.fieldname + '.'+ext);
	}
});

var upload = multer({
	storage: storage
});

module.exports = function(app) {
	// Form Routes
	app.route('/forms')
		.get(auth.isAuthenticatedOrApiKey, forms.list)
		.post(auth.isAuthenticatedOrApiKey, forms.create);

	app.route('/forms/:formId([a-zA-Z0-9]+)')
		.get(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.read)
		.post(forms.createSubmission)
		.put(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.update)
		.delete(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.delete);

	app.route('/forms/:formId([a-zA-Z0-9]+)/submissions')
		.get(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.listSubmissions)
		.delete(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.deleteSubmissions);

	// Finish by binding the form middleware
	app.param('formId', forms.formByID);
};
