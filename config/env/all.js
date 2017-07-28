'use strict';

module.exports = {
	app: {
		google_analytics_id: process.env.GOOGLE_ANALYTICS_ID || '',
		title: process.env.APP_NAME || 'TellForm',
		description: process.env.APP_DESC || 'Opensource form builder alternative to TypeForm',
		keywords:  process.env.APP_KEYWORDS || 'typeform, pdfs, forms, opensource, formbuilder, google forms, nodejs'
	},
	db: {
		uri: 'mongodb://'+ (process.env.DB_PORT_27017_TCP_ADDR || process.env.DB_HOST || 'localhost')+'/mean',
		options: {
			user: '',
			pass: ''
		}
	},
	aws: {
		'accessKeyId': process.env.AWS_ACCESS_ID,
		'secretAccessKey': process.env.AWS_SECRET_KEY,
		'region': process.env.AWS_REGION
	},

	port: process.env.PORT || 3000,
	socketPort: process.env.SOCKET_PORT || 20523,

	templateEngine: 'swig',

	reCAPTCHA_Key: process.env.reCAPTCHA_KEY || '',

    signupDisabled: (process.env.SIGNUP_DISABLED === 'TRUE'),
	enableClusterMode: (process.env.ENABLE_CLUSTER_MODE === 'TRUE'),
	baseUrl: '',
	tempUserCollection: 'temporary_users',

	mailosaur: {
		key: process.env.MAILOSAUR_KEY || '',
		mailbox_id: process.env.MAILOSAUR_MAILBOX || ''
	},

	subdomainsDisabled: (process.env.SUBDOMAINS_DISABLED === 'TRUE'),

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
		maxAge:  24 * 60 * 60 * 1000 // 24 hours
		// To set the cookie in a specific domain uncomment the following
		// setting:
		//domain: process.env.COOKIE_SESSION_URL || process.env.BASE_URL || '.tellform.com'
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
	    fileLogger: {
            directoryPath: process.cwd(),
            fileName: 'app.log',
            maxsize: 10485760,
            maxFiles: 2,
            json: false
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
			'public/config.js',
            'public/application.js',
			'public/dist/populate_template_cache.js',
			'public/modules/*/*.js',
			'public/modules/*/*/*/*/*.js',
			'public/modules/*/*/*.js',
			'public/modules/*/*/*/*.js',
			'!public/modules/**/gruntfile.js',
			'!public/modules/**/demo/**/*.js',
			'!public/modules/**/dist/**/*.js',
			'!public/modules/**/node_modules/**/*.js',
			'!public/modules/**/tests/**/*.js'
		],
		form_js: [
			'public/form-config.js',
			'public/form-application.js',
			'public/dist/form_populate_template_cache.js',
			'public/form_modules/forms/*.js',
			'public/form_modules/forms/*/*/*/*.js',
			'public/form_modules/forms/*/*.js',
			'public/form_modules/forms/*/*/*.js',
			'public/form_modules/forms/**.js'
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
		],
		form_unit_tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/form_modules/*/tests/unit/**/*.js',
			'!public/form_modules/**/demo/**/*.js',
			'!public/form_modules/**/node_modules/**/*.js'
		],
		form_e2e_tests: [
			'public/form_modules/*/tests/e2e/**.js',
			'!public/form_modules/**/demo/**/*.js',
			'!public/form_modules/**/node_modules/**/*.js'
		]
	}
};
