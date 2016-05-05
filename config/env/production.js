'use strict';

module.exports = {
	baseUrl: process.env.BASE_URL || 'tellform.com',
	db: {
		uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || '192.168.99.100:27017') + '/mean',
		options: {
			user: '',
			pass: process.env.MONGOLAB_PASS || ''
		}
	},
	port: process.env.PORT || 4545,
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
		domain: process.env.BASE_URL || 'tellform.com'
	},
	assets: {
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'no-reply@tellform.com',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || '',
			ssl: false,
			host: 'smtp.sparkpostmail.com',
			port: 587,
			secure: false,
			auth: {
				user: process.env.MAILER_EMAIL_ID || '',
				pass: process.env.MAILER_PASSWORD || ''
			}
		}
	}
};
