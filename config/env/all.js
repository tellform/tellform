'use strict';

module.exports = {
	app: {
		title: 'MedForms',
		description: 'Generate Forms from PDFs',
		keywords: 'typeform, pdfs, forms, generator, form generator',
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',

	baseUrl: '',
	tempUserCollection: 'temporary_users',

	mailosaur: {
		key: process.env.MAILOSAUR_KEY || '',
		mailbox_id: process.env.MAILOSAUR_MAILBOX || '',
	},

	//Sentry DSN Client Key
	DSN: 'http://db01e03015ce48e2b68240ea8254b17c:5d878e9bb6c6488fbb70fb81295ee700@sentry.polydaic.com/1',

	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'MEAN',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions',
	// The session cookie settings
	sessionCookie: {
		path: '/',
		httpOnly: true,
		// If secure is set to true then it will cause the cookie to be set
		// only when SSL-enabled (HTTPS) is used, and otherwise it won't
		// set a cookie. 'true' is recommended yet it requires the above
		// mentioned pre-requisite.
		secure: false,
		// Only set the maxAge to null if the cookie shouldn't be expired
		// at all. The cookie will expunge when the browser is closed.
		maxAge: null,
		// To set the cookie in a specific domain uncomment the following
		// setting:
		// domain: 'forms.polydaic.com'
	},

	/*
	 * Upload Configuration
	 */
	//Global upload path 
	uploadPath : 'uploads/',
	//PDF storage path
	pdfUploadPath: 'uploads/pdfs/',
	//Temp files storage path
	tmpUploadPath: 'uploads/tmp/',

	// The session cookie name
	sessionName: 'connect.sid',
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	},
	assets: {
		// lib: {
		// 	css: [
		// 		'public/lib/bootstrap/dist/css/bootstrap.css',
		// 		'public/lib/bootstrap/dist/css/bootstrap-theme.css',
		// 	],
		// 	js: [
		// 		'public/lib/angular/angular.js',
		// 		'public/lib/angular-permission/dist/angular-permission.js',
		// 		'public/lib/angular-resource/angular-resource.js',
		// 		'public/lib/angular-animate/angular-animate.js',
		// 		'public/lib/angular-ui-router/release/angular-ui-router.js',
		// 		'public/lib/angular-ui-utils/ui-utils.js',
		// 		'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
		// 		'public/lib/ng-file-upload/ng-file-upload-all.js',
		// 		'public/lib/angular-cookies/angular-cookies.js',
		// 	]
		// },
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		views: [
			'public/modules/*/views/*.html',
			'public/modules/*/views/**/*.html'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js',
			'public/modules/*/tests/*/*.js',
		]
	}
};
