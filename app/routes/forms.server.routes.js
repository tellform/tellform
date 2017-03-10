'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	forms = require('../../app/controllers/forms.server.controller'),
	multer = require('multer'),
	config = require('../../config/config'),
	auth = require('../../config/passport_helpers'),
	multerS3 = require('multer-s3'),
	aws = require('aws-sdk');



// Amazon S3 Uploads
aws.config.update({region: 'us-west-2'});
var s3 = new aws.S3();

var upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'tellform-test',
		metadata: function (req, file, cb) {
			cb(null, {fieldName: file.fieldname});
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString())
		}
	})
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

	app.route('/forms/:formId([a-zA-Z0-9]+)/submissions/upload')
		.post(upload.single('file'), forms.uploadTemp);

	// Finish by binding the form middleware
	app.param('formId', forms.formByID);
};
