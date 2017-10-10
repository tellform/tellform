'use strict';

module.exports = {
	app: {
		google_analytics_id: process.env.GOOGLE_ANALYTICS_ID || '',
		title: process.env.APP_NAME || 'TellForm',
		description: process.env.APP_DESC || 'Opensource form builder alternative to TypeForm',
		keywords:  process.env.APP_KEYWORDS || 'typeform, pdfs, forms, opensource, formbuilder, google forms, nodejs'
	},
	db: {
		uri: 'mongodb://'+ (process.env.DB_PORT_27017_TCP_ADDR || process.env.MONGODB_URI || 'localhost')+'/mean',
		options: {
			user: '',
			pass: ''
		}
	},

	port: process.env.PORT || 3000,
	socketPort: process.env.SOCKET_PORT || 20523,

	templateEngine: 'swig',

 	signupDisabled: (process.env.SIGNUP_DISABLED === 'TRUE'),
	enableClusterMode: (process.env.ENABLE_CLUSTER_MODE === 'TRUE'),
	baseUrl: process.env.BASE_URL || 'localhost:3000',
	tempUserCollection: 'temporary_users',

	subdomainsDisabled: (process.env.SUBDOMAINS_DISABLED === 'TRUE'),

	//Sentry DSN Client Key
	DSN: process.env.RAVEN_DSN || '',

	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: process.env.SESSION_SECRET || 'CHANGE_ME_PLEASE',
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
	},
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
			'public/modules/**/css/*.css'
		],
		//Order matters here as some directives in form_modules override those in modules
		js: [
			'public/config.js',
            'public/application.js',
			'public/dist/populate_template_cache.js',
			'public/modules/*/*.js',
			'public/modules/*/*/*.js',
			'public/modules/*/*/*/*.js',
			'public/modules/*/*/*/*/*.js',
			'public/form_modules/forms/*.js',
			'public/form_modules/forms/directives/*.js',
			'public/form_modules/forms/base/config/*.js',
			'public/form_modules/forms/base/config/*/*.js',
			'public/form_modules/forms/base/**/*.js',
			'public/form_modules/forms/base/*/*.js',
			'!public/modules/*/tests/**/*.js',
			'!public/modules/*/tests/*.js'
		],
		form_js: [
			'public/form-config.js',
			'public/form-application.js',
			'public/dist/form_populate_template_cache.js',
			'public/form_modules/forms/*.js',
			'public/form_modules/forms/*/*.js',
			'public/form_modules/forms/*/*/*.js',
			'public/form_modules/forms/*/*/*/*.js',
			'public/form_modules/forms/**.js',
			'!public/form_modules/**/tests/**/*.js'
		],
		views: [
			'public/modules/**/*.html',
			'public/form_modules/forms/base/**/*.html'
		],
		unit_tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/unit/**/*.js'
		],
		e2e_tests: [
			'public/modules/*/tests/e2e/**.js'
		],
		form_unit_tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/form_modules/*/tests/unit/**/*.js'
		],
		form_e2e_tests: [
			'public/form_modules/*/tests/e2e/**.js'
		]
	}
};
