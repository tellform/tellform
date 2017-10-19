'use strict';

module.exports = {
	baseUrl: 'https://forms.polydaic.com',
	port: 8443,
	db: {
		uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1/mean',
		options: {
			user: '',
			pass: ''
		}
	},
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	},

	sessionCookie: {
		path: '/',
		httpOnly: false,
		// If secure is set to true then it will cause the cookie to be set
		// only when SSL-enabled (HTTPS) is used, and otherwise it won't
		// set a cookie. 'true' is recommended yet it requires the above
		// mentioned pre-requisite.
		secure: true,
		// Only set the maxAge to null if the cookie shouldn't be expired
		// at all. The cookie will expunge when the browser is closed.
		maxAge: 7200,
		// To set the cookie in a specific domain uncomment the following
		// setting:
		domain: process.env.BASE_URL || 'localhost:3000'
	},
	assets: {
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	mailer: {
		from: process.env.MAILER_FROM || '',
		options: process.env.MAILER_SMTP_HOST ? { //Uses custom SMTP if MAILER_SMTP_HOST is set
			host: process.env.MAILER_SMTP_HOST || '',
			port: process.env.MAILER_SMTP_PORT || 587,
			secure: process.env.MAILER_SMTP_SECURE || true,
			auth: {
				user: process.env.MAILER_EMAIL_ID || '',
				pass: process.env.MAILER_PASSWORD || ''
			}
		} : {
			service: process.env.MAILER_SERVICE_PROVIDER || '',
			auth: {
				user: process.env.MAILER_EMAIL_ID || '',
				pass: process.env.MAILER_PASSWORD || ''
			}
		}
	}
};
