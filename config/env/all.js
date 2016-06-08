'use strict';

module.exports = {
	app: {
		google_analytics_id: process.env.GOOGLE_ANALYTICS_ID || '',
		title: process.env.APP_NAME || 'TellForm',
		description: process.env.APP_DESC || 'Opensource form builder alternative to TypeForm',
		keywords:  process.env.APP_KEYWORDS || 'typeform, pdfs, forms, opensource, formbuilder, google forms, nodejs'
	},
	port: process.env.PORT || 5000,
	socketPort: process.env.SOCKET_PORT || 35729,

	templateEngine: 'swig',

	reCAPTCHA_Key: process.env.reCAPTCHA_KEY || '',

    signupDisabled: !!process.env.SIGNUP_DISABLED,
	baseUrl: '',
	tempUserCollection: 'temporary_users',

	mailosaur: {
		key: process.env.MAILOSAUR_KEY || '',
		mailbox_id: process.env.MAILOSAUR_MAILBOX || ''
	},

	//Sentry DSN Client Key
	DSN: process.env.RAVEN_DSN || '',

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
		maxAge: null
		// To set the cookie in a specific domain uncomment the following
		// setting:
		// domain: 'tellform.com'
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
		css: [
			'public/modules/**/css/*.css',
			'!public/modules/**/demo/**/*.css',
			'!public/modules/**/dist/**/*.css',
			'!public/modules/**/node_modules/**/*.css'
		],
		js: [
			'public/dist/populate_template_cache.js',
			'public/config.js',
            'public/application.js',
			'public/*.js',
			'public/modules/*/*.js',
			'public/modules/*/*/*.js',
			'public/modules/**/*.js',
			'!public/modules/**/gruntfile.js',
			'!public/modules/**/demo/**/*.js',
			'!public/modules/**/dist/**/*.js',
			'!public/modules/**/node_modules/**/*.js',
			'!public/modules/**/tests/**/*.js'
		],
		views: [
			'public/modules/**/*.html',
			'!public/modules/**/demo/**/*.html',
			'!public/modules/**/dist/**/*.html',
			'!public/modules/**/node_modules/**/*.html',
			'!public/modules/**/tests/**/*.html'
		],
		unit_tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/unit/**/*.js',
			'!public/modules/**/demo/**/*.js',
			'!public/modules/**/node_modules/**/*.js'
		],
		e2e_tests: [
			'public/modules/*/tests/e2e/**.js',
			'!public/modules/**/demo/**/*.js',
			'!public/modules/**/node_modules/**/*.js'
		]
	}
};
