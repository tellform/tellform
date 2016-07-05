'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	forms = require('../../app/controllers/forms.server.controller'),
	multer = require('multer'),
	config = require('../../config/config');

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
		.get(users.requiresLogin, forms.hasAuthorization, forms.listSubmissions)
		.delete(users.requiresLogin, forms.hasAuthorization, forms.deleteSubmissions);

	// Finish by binding the form middleware
	app.param('formId', forms.formByID);
};
