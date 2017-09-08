'use strict';

/**
 * Module dependencies.
 */
var submissions = require('../../app/controllers/submissions.server.controller'),
	auth = require('../../config/passport_helpers');

module.exports = function(app) {
	// Form Submission Routes
	app.route('/forms/:agency/:formId([a-zA-Z0-9]+)/submissions')
		.post(submissions.create)
		.get(auth.isAuthenticatedOrApiKey, submissions.hasAuthorization, submissions.list)
		.delete(auth.isAuthenticatedOrApiKey, submissions.hasAuthorization, submissions.delete);

	app.route('/forms/:agency/:formId([a-zA-Z0-9]+)/submissions/count')
		.get(auth.isAuthenticatedOrApiKey, submissions.hasAuthorization, submissions.count);
};
